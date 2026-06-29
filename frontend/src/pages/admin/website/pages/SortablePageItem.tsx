import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Lock } from 'lucide-react'
import type { Page } from '@/features/pages/types'
import styles from './PagesPage.module.css'

interface SortablePageItemProps {
  page: Page
  isSelected: boolean
  isSaving: boolean
  onSelect: (id: number) => void
  onDelete: (id: number) => void
}

export function SortablePageItem({
  page,
  isSelected,
  isSaving,
  onSelect,
  onDelete,
}: SortablePageItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: page.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 2 : 'auto' as const,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.itemCard} ${isSelected ? styles.itemCardActive : ''} ${isDragging ? styles.dragging : ''}`}
      onClick={() => onSelect(page.id)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.dragHandle} title="Drag to reorder">
          <GripVertical size={15} />
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.cardTitleRow}>
            <h4 className={styles.cardTitle}>{page.title || 'Untitled Page'}</h4>
            {page.is_system && (
              <span className={styles.systemBadge} title="System page — cannot be deleted">
                <Lock size={10} />
              </span>
            )}
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.slugChip}>/{page.slug}</span>
            <span className={`${styles.templateChip}`}>{page.template}</span>
            <span className={`${styles.statusChip} ${page.status === 1 ? styles.statusPublished : styles.statusDraft}`}>
              {page.status === 1 ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>
      </div>

      {!page.is_system && (
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={e => { e.stopPropagation(); onDelete(page.id) }}
          disabled={isSaving}
          aria-label={`Delete ${page.title}`}
        >
          Delete
        </button>
      )}
    </div>
  )
}
