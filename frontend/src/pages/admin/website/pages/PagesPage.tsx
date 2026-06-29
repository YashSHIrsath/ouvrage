import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, Modifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useBlocker } from 'react-router-dom'
import { PageHeader, AdminButton } from '@/components/ui'
import {
  useAdminPages,
  useCreatePage,
  useUpdatePage,
  useDeletePage,
  useReorderPages,
} from '@/features/pages/hooks/useAdminPages'
import { useNavItems, useCreateNavItem } from '@/features/navigation/hooks/useNavItems'
import type { Page, PageFormValues, NavLinkOptions } from '@/features/pages/types'
import { SortablePageItem } from './SortablePageItem'
import { PageForm } from './PageForm'
import styles from './PagesPage.module.css'

const restrictToVerticalAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 })

export function PagesPage() {
  const { data: pages = [], isLoading, isError } = useAdminPages()

  const [selectedId, setSelectedId]     = useState<number | null>(null)
  const [isFormDirty, setIsFormDirty]   = useState(false)
  const [hasSelectedInitial, setHasSelectedInitial] = useState(false)

  // Local list for optimistic DnD — same pattern as ServicesPage
  const [localPages, setLocalPages] = useState<Page[]>([])
  useEffect(() => { setLocalPages(pages) }, [pages])

  const createMutation    = useCreatePage()
  const updateMutation    = useUpdatePage()
  const deleteMutation    = useDeletePage()
  const reorderMutation   = useReorderPages()
  const createNavMutation = useCreateNavItem()

  const { data: navItems = [] } = useNavItems()
  const navAlreadyLinked = navItems.some(n => n.page_id === selectedId)

  const isSaving =
    createMutation.isPending    ||
    updateMutation.isPending    ||
    deleteMutation.isPending    ||
    reorderMutation.isPending   ||
    createNavMutation.isPending

  // Auto-select first item once data loads
  const nonDeleted = localPages.filter(p => p.status !== 9)
  useEffect(() => {
    if (!hasSelectedInitial && nonDeleted.length > 0) {
      setSelectedId(nonDeleted[0].id)
      setHasSelectedInitial(true)
    }
  }, [nonDeleted, hasSelectedInitial])

  // Stats
  const totalCount     = nonDeleted.length
  const publishedCount = nonDeleted.filter(p => p.status === 1).length
  const draftCount     = nonDeleted.filter(p => p.status === 0).length

  const selectedPage = pages.find(p => p.id === selectedId) ?? null

  // Unsaved changes guard — same pattern as ServicesPage
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isFormDirty && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm('You have unsaved changes. Discard them and leave?')
      if (proceed) blocker.proceed()
      else         blocker.reset()
    }
  }, [blocker.state])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isFormDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isFormDirty])

  const handleSelect = (id: number) => {
    if (isFormDirty && !confirm('You have unsaved changes. Discard them and switch?')) return
    setSelectedId(id)
    setIsFormDirty(false)
  }

  const handleAdd = () => {
    if (isFormDirty && !confirm('You have unsaved changes. Discard them?')) return
    createMutation.mutate(
      { title: 'New Page', template: 'standard', status: 0 },
      {
        onSuccess: (created) => {
          setSelectedId(created.id)
          setIsFormDirty(false)
        },
      }
    )
  }

  const handleFormSubmit = (values: PageFormValues, navLink?: NavLinkOptions) => {
    if (!selectedId) return
    updateMutation.mutate(
      { id: selectedId, values },
      {
        onSuccess: () => {
          setIsFormDirty(false)
          if (navLink) {
            createNavMutation.mutate({
              label:     navLink.label || values.nav_label || values.title,
              href:      `/${values.slug}`,
              type:      'page',
              page_id:   selectedId,
              is_navbar: navLink.is_navbar,
              is_footer: navLink.is_footer,
              status:    1,
            })
          }
        },
      }
    )
  }

  const handleDelete = (id: number) => {
    const page = localPages.find(p => p.id === id)
    if (!page || page.is_system) return
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setIsFormDirty(false)
        if (selectedId === id) {
          const remaining = nonDeleted.filter(p => p.id !== id)
          setSelectedId(remaining[0]?.id ?? null)
        }
      },
    })
  }

  // DnD sensors — identical to ServicesPage
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = nonDeleted.findIndex(p => p.id === active.id)
    const newIndex = nonDeleted.findIndex(p => p.id === over.id)
    const reordered = arrayMove(nonDeleted, oldIndex, newIndex)

    const payload: { id: number; sort_order: number }[] = []
    const updated = localPages.map(page => {
      const listIndex = reordered.findIndex(r => r.id === page.id)
      if (listIndex !== -1) {
        const newOrder = listIndex + 1
        if (page.sort_order !== newOrder) payload.push({ id: page.id, sort_order: newOrder })
        return { ...page, sort_order: newOrder }
      }
      return page
    })

    setLocalPages([...updated].sort((a, b) => a.sort_order - b.sort_order))
    reorderMutation.mutate(payload, {
      onError: () => setLocalPages(pages),
    })
  }

  if (isLoading) return <div className={styles.loading}>Loading pages…</div>
  if (isError)   return <div className={styles.error}>Unable to load pages.</div>

  return (
    <div className={styles.page}>
      <PageHeader
        title="Pages"
        description="Manage site pages, slugs, templates, and publication status."
        className={styles.compactHeader}
        actions={
          <AdminButton
            variant="primary"
            size="sm"
            icon={<Plus size={14} />}
            onClick={handleAdd}
            disabled={isSaving}
          >
            New Page
          </AdminButton>
        }
      />

      <div className={styles.splitLayout}>
        {/* ── Left pane: page list ── */}
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
            <span className={styles.listTitle}>Pages</span>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{totalCount}</span>
              <span className={styles.statLbl}>Total</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{publishedCount}</span>
              <span className={styles.statLbl}>Live</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{draftCount}</span>
              <span className={styles.statLbl}>Draft</span>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <div className={styles.listContainer}>
              {nonDeleted.length === 0 ? (
                <div className={styles.empty}>No pages yet.</div>
              ) : (
                <SortableContext items={nonDeleted.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  {nonDeleted.map(page => (
                    <SortablePageItem
                      key={page.id}
                      page={page}
                      isSelected={page.id === selectedId}
                      isSaving={isSaving}
                      onSelect={handleSelect}
                      onDelete={handleDelete}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </DndContext>
        </div>

        {/* ── Right pane: form ── */}
        <div className={styles.editorPane}>
          <PageForm
            key={selectedId ?? 'none'}
            initialValues={selectedPage}
            onSubmit={handleFormSubmit}
            onDiscard={() => setIsFormDirty(false)}
            isSaving={isSaving}
            onDirtyChange={setIsFormDirty}
            navAlreadyLinked={navAlreadyLinked}
          />
        </div>
      </div>
    </div>
  )
}
