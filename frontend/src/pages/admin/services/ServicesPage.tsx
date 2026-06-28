import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
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
import styles from './ServicesPage.module.css'

const restrictToVerticalAxis: Modifier = ({ transform }) => ({
  ...transform,
  x: 0,
})

export function ServicesPage() {
  const { data: services = [], isLoading, isError } = useServices()
  const [selectedId, setSelectedId] = useState<string | number | null>(null)
  const [isFormDirty, setIsFormDirty] = useState(false)
  
  // Local list state for optimistic updates
  const [localServices, setLocalServices] = useState<Service[]>([])

  // Keep localServices in sync with React Query fetched services
  useEffect(() => {
    if (services) {
      setLocalServices(services)
    }
  }, [services])

  // Blocker to guard route changes (sidebar navigations, browser navigation) when dirty
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

  // Blocker to guard window closures, tab refreshes when dirty
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

  // Exclude status === 9 soft deleted items
  const visibleServices = localServices.filter((s) => s.status !== 9)

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
  }

  const handleAddClick = () => {
    if (isFormDirty) {
      if (!confirm('You have unsaved changes. Discard them and add new?')) {
        return
      }
    }
    setSelectedId(null) // Reset selection for new service form
    setIsFormDirty(false)
  }

  const handleFormSubmit = (values: ServiceFormValues) => {
    if (selectedId !== null) {
      // Edit existing
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
      // Create new
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
      // Find where it sits in the reordered list
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

    // Sort updatedServices locally so the UI updates instantly
    const sortedServices = [...updatedServices].sort((a, b) => a.sort_order - b.sort_order)

    // Apply optimistic state
    setLocalServices(sortedServices)

    // Post to API, rollback on error
    reorderMutation.mutate(payload, {
      onError: () => {
        // Rollback state to the last verified query cache services
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

  return (
    <div className={styles.page}>
      <PageHeader
        title="Services Management"
        description="Configure construction, development, and engineering consulting services."
      />

      <div className={styles.splitLayout}>
        {/* ── Left Pane: Master List ──────────────────────── */}
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
            <span className={styles.listTitle}>Services ({visibleServices.length})</span>
            <AdminButton
              variant="primary"
              size="sm"
              icon={<Plus size={14} />}
              onClick={handleAddClick}
              disabled={isSaving}
            >
              Add Service
            </AdminButton>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <div className={styles.listContainer}>
              {visibleServices.length === 0 ? (
                <div className={styles.empty}>No services configured.</div>
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
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </DndContext>
        </div>

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
    </div>
  )
}
