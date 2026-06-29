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
import { PageHeader, AdminButton } from '@/components/ui'
import {
  useNavItems,
  useCreateNavItem,
  useUpdateNavItem,
  useDeleteNavItem,
  useReorderNavItems,
} from '@/features/navigation/hooks/useNavItems'
import { useAdminPages } from '@/features/pages/hooks/useAdminPages'
import type { NavItem, NavItemFormValues } from '@/features/navigation/types'
import { SortableNavItem } from './SortableNavItem'
import styles from './NavigationPage.module.css'

const restrictToVerticalAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 })

export function NavigationPage() {
  const { data: items = [], isLoading, isError } = useNavItems()
  const { data: pages = [] } = useAdminPages()

  // Local list for optimistic DnD — same pattern as ServicesPage
  const [localItems, setLocalItems] = useState<NavItem[]>([])
  useEffect(() => { setLocalItems(items) }, [items])

  const createMutation  = useCreateNavItem()
  const updateMutation  = useUpdateNavItem()
  const deleteMutation  = useDeleteNavItem()
  const reorderMutation = useReorderNavItems()

  const isSaving =
    createMutation.isPending  ||
    updateMutation.isPending  ||
    deleteMutation.isPending  ||
    reorderMutation.isPending

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const visibleItems = localItems.filter(i => i.status !== 9)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = visibleItems.findIndex(i => i.id === active.id)
    const newIndex = visibleItems.findIndex(i => i.id === over.id)
    const reordered = arrayMove(visibleItems, oldIndex, newIndex)

    const payload: { id: number; sort_order: number }[] = []
    const updated = localItems.map(item => {
      const listIndex = reordered.findIndex(r => r.id === item.id)
      if (listIndex !== -1) {
        const newOrder = listIndex + 1
        if (item.sort_order !== newOrder) payload.push({ id: item.id, sort_order: newOrder })
        return { ...item, sort_order: newOrder }
      }
      return item
    })

    setLocalItems([...updated].sort((a, b) => a.sort_order - b.sort_order))
    reorderMutation.mutate(payload, {
      onError: () => setLocalItems(items),
    })
  }

  const handleUpdate = (id: number, values: NavItemFormValues) => {
    updateMutation.mutate({ id, values })
  }

  const handleDelete = (id: number) => {
    const label = localItems.find(i => i.id === id)?.label ?? 'this item'
    if (confirm(`Delete "${label}" from navigation?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleAdd = () => {
    createMutation.mutate({
      label:     'New Link',
      href:      '/',
      type:      'page',
      page_id:   null,
      is_navbar: true,
      is_footer: false,
      status:    1,
    })
  }

  if (isLoading) return <div className={styles.loading}>Loading navigation…</div>
  if (isError)   return <div className={styles.error}>Unable to load navigation items.</div>

  return (
    <div className={styles.page}>
      <PageHeader
        title="Navigation"
        description="Configure header and footer link order, labels, and visibility. Drag to reorder."
        actions={
          <AdminButton
            variant="primary"
            icon={<Plus size={14} />}
            onClick={handleAdd}
            disabled={isSaving}
          >
            Add Item
          </AdminButton>
        }
      />

      <div className={styles.tableWrapper}>
        {/* Column headers */}
        <div className={styles.tableHead}>
          <span />
          <span className={styles.colLabel}>Type</span>
          <span className={styles.colLabel}>Label</span>
          <span className={styles.colLabel}>Page / URL</span>
          <span className={styles.colLabel} style={{ textAlign: 'center' }}>Link</span>
          <span className={styles.colLabel} style={{ textAlign: 'center' }}>Navbar</span>
          <span className={styles.colLabel} style={{ textAlign: 'center' }}>Footer</span>
          <span className={styles.colLabel} style={{ textAlign: 'center' }}>Status</span>
          <span />
        </div>

        {/* Drag-and-drop list */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={visibleItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
            {visibleItems.length === 0 ? (
              <div className={styles.empty}>No navigation items yet. Click "Add Item" to create one.</div>
            ) : (
              visibleItems.map(item => (
                <SortableNavItem
                  key={item.id}
                  item={item}
                  pages={pages}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  isUpdating={isSaving}
                />
              ))
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
