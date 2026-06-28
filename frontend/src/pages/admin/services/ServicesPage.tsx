import { useState, useEffect } from 'react'
import { Plus, ChevronLeft, ChevronRight, Search, Menu } from 'lucide-react'
import { PageHeader, AdminButton } from '@/components/ui'
import { ServiceForm } from '@/features/services/components/ServiceForm/ServiceForm'
import type { Service, ServiceFormValues } from '@/features/services/types'
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useReorderServices,
} from '@/features/services/hooks/useServices'
import { SortableServiceItem } from './SortableServiceItem'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, Modifier } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { useBlocker } from 'react-router-dom'
import { useServicePanelStore } from '@/stores/servicePanelStore'
import { Drawer } from 'antd'
import styles from './ServicesPage.module.css'

const restrictToVerticalAxis: Modifier = ({ transform }) => ({
  ...transform,
  x: 0,
})

export function ServicesPage() {
  const { data: services = [], isLoading, isError } = useServices()
  const [selectedId, setSelectedId] = useState<string | number | null>(null)
  const [isFormDirty, setIsFormDirty] = useState(false)
  
  // Collapse Pane persistent state
  const { isCollapsed, toggleCollapsed } = useServicePanelStore()

  // Search filter and responsive checks
  const [searchQuery, setSearchQuery] = useState('')
  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w <= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Local list state for optimistic updates
  const [localServices, setLocalServices] = useState<Service[]>([])

  // Keep localServices in sync with React Query fetched services
  useEffect(() => {
    if (services) {
      setLocalServices(services)
    }
  }, [services])

  // Blocker to guard route changes when dirty
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isFormDirty && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm(
        'You have unsaved changes in the editor. Are you sure you want to discard them and leave?'
      )
      if (proceed) {
        blocker.proceed()
      } else {
        blocker.reset()
      }
    }
  }, [blocker.state])

  // Blocker to guard window closures when dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return e.returnValue
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isFormDirty])

  // Mutations
  const createMutation = useCreateService()
  const updateMutation = useUpdateService()
  const deleteMutation = useDeleteService()
  const reorderMutation = useReorderServices()

  const isSaving = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || reorderMutation.isPending

  const [hasSelectedInitial, setHasSelectedInitial] = useState(false)

  // Filter out status === 9 soft deleted items
  const nonDeletedServices = localServices.filter((s) => s.status !== 9)

  // Filter based on search query
  const visibleServices = nonDeletedServices.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Stats Counters
  const totalCount = nonDeletedServices.length
  const activeCount = nonDeletedServices.filter((s) => s.status === 1).length
  const inactiveCount = nonDeletedServices.filter((s) => s.status === 0).length

  // Set initial selection once services load for the first time
  useEffect(() => {
    if (!hasSelectedInitial && visibleServices.length > 0) {
      setSelectedId(visibleServices[0].id)
      setHasSelectedInitial(true)
    }
  }, [services, visibleServices, hasSelectedInitial])

  const selectedService = services.find((s) => s.id === selectedId) || null

  const handleSelectService = (id: string | number) => {
    if (isFormDirty) {
      if (!confirm('You have unsaved changes. Discard them and switch?')) {
        return
      }
    }
    setSelectedId(id)
    setIsFormDirty(false)
    if (isMobile) {
      setDrawerOpen(false) // Close drawer on selection on mobile
    }
  }

  const handleAddClick = () => {
    if (isFormDirty) {
      if (!confirm('You have unsaved changes. Discard them and add new?')) {
        return
      }
    }
    setSelectedId(null) // Reset selection for new service form
    setIsFormDirty(false)
    if (isMobile) {
      setDrawerOpen(false)
    }
  }

  const handleFormSubmit = (values: ServiceFormValues) => {
    if (selectedId !== null) {
      updateMutation.mutate(
        { id: selectedId, values },
        {
          onSuccess: (updated) => {
            setIsFormDirty(false) // reset dirty state immediately
            setSelectedId(updated.id)
          },
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: (created) => {
          setIsFormDirty(false) // reset dirty state immediately
          setSelectedId(created.id)
        },
      })
    }
  }

  const handleFormDiscard = () => {
    setIsFormDirty(false)
  }

  const handleDeleteService = (id: string | number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setIsFormDirty(false) // reset dirty state
          if (selectedId === id) {
            const remaining = visibleServices.filter((s) => s.id !== id)
            setSelectedId(remaining[0]?.id ?? null)
          }
        },
      })
    }
  }

  // DND kit Pointer activations
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = visibleServices.findIndex((s) => s.id === active.id)
    const newIndex = visibleServices.findIndex((s) => s.id === over.id)

    // Move in local state array optimistically
    const reorderedList = arrayMove(visibleServices, oldIndex, newIndex)

    // Build payload only for rows that have changed
    const payload: { id: string | number; sort_order: number }[] = []
    const updatedServices = localServices.map((service) => {
      const listIndex = reorderedList.findIndex((s) => s.id === service.id)
      if (listIndex !== -1) {
        const newOrder = listIndex + 1
        if (service.sort_order !== newOrder) {
          payload.push({ id: service.id, sort_order: newOrder })
        }
        return { ...service, sort_order: newOrder }
      }
      return service
    })

    const sortedServices = [...updatedServices].sort((a, b) => a.sort_order - b.sort_order)
    setLocalServices(sortedServices)

    reorderMutation.mutate(payload, {
      onError: () => {
        setLocalServices(services)
      },
    })
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>Loading services…</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorText}>Unable to load services from the database.</span>
      </div>
    )
  }

  const effectiveCollapsed = (isCollapsed || isTablet) && !isMobile

  // Master List Render block
  const renderList = (inDrawer = false) => {
    const showCollapsed = effectiveCollapsed && !inDrawer

    return (
      <>
        {showCollapsed ? (
          <div className={styles.listHeaderCollapsed}>
            <button
              type="button"
              className={styles.addIconBtn}
              onClick={handleAddClick}
              disabled={isSaving}
              title="Add Service"
            >
              <Plus size={16} />
            </button>
            {!isTablet && (
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={toggleCollapsed}
                title="Expand Panel"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className={styles.listHeader}>
            <span className={styles.listTitle}>Services</span>
            <div className={styles.headerActions}>
              <AdminButton
                variant="primary"
                size="sm"
                icon={<Plus size={14} />}
                onClick={handleAddClick}
                disabled={isSaving}
              >
                Add
              </AdminButton>
              {!inDrawer && (
                <button
                  type="button"
                  className={styles.toggleBtn}
                  onClick={toggleCollapsed}
                  title="Collapse Panel"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {showCollapsed ? (
          <div className={styles.statsContainerCollapsed} title={`Total: ${totalCount} | Active: ${activeCount} | Inactive: ${inactiveCount}`}>
            <span className={styles.miniStat}>{totalCount}</span>
          </div>
        ) : (
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{totalCount}</span>
              <span className={styles.statLbl}>Total</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{activeCount}</span>
              <span className={styles.statLbl}>Active</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{inactiveCount}</span>
              <span className={styles.statLbl}>Inactive</span>
            </div>
          </div>
        )}

        {/* Search */}
        {!showCollapsed && (
          <div className={styles.searchBar}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}

        {/* Drag & Drop Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <div className={styles.listContainer}>
            {visibleServices.length === 0 ? (
              <div className={styles.empty}>No matches found.</div>
            ) : (
              <SortableContext
                items={visibleServices.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {visibleServices.map((service) => (
                  <SortableServiceItem
                    key={service.id}
                    service={service}
                    isSelected={service.id === selectedId}
                    isSaving={isSaving}
                    onSelect={handleSelectService}
                    onDelete={handleDeleteService}
                    isCollapsed={showCollapsed}
                  />
                ))}
              </SortableContext>
            )}
          </div>
        </DndContext>
      </>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Services Management"
        description="Configure construction, development, and engineering consulting services."
        className={styles.compactHeader}
      />

      {/* Mobile Toggle Drawer Trigger */}
      {isMobile && (
        <div className={styles.mobileActions}>
          <AdminButton
            variant="default"
            size="sm"
            icon={<Menu size={14} />}
            onClick={() => setDrawerOpen(true)}
          >
            Show Services List ({totalCount})
          </AdminButton>
        </div>
      )}

      <div className={styles.splitLayout}>
        {/* ── Left Pane: Master List ──────────────────────── */}
        {!isMobile && (
          <div className={`${styles.listPane} ${effectiveCollapsed ? styles.listPaneCollapsed : ''}`}>
            {renderList(false)}
          </div>
        )}

        {/* ── Right Pane: Detail Editor ───────────────────── */}
        <div className={styles.editorPane}>
          <div className={styles.editorContent}>
            <ServiceForm
              key={selectedId ?? 'new'} // force re-create component state when selection changes
              initialValues={selectedService}
              onSubmit={handleFormSubmit}
              onDiscard={handleFormDiscard}
              isSaving={isSaving}
              onDirtyChange={setIsFormDirty}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={310}
          styles={{ body: { padding: '1rem', background: 'var(--color-bg-container)' } }}
        >
          <div className={styles.mobileListTitle}>Services</div>
          {renderList(true)}
        </Drawer>
      )}
    </div>
  )
}
