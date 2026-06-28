import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Image as ImageIcon } from 'lucide-react'
import { StatusBadge } from '@/components/ui'
import type { Service } from '@/features/services/types'
import { useEffect, useState } from 'react'
import styles from './ServicesPage.module.css'

interface SortableServiceItemProps {
  service: Service
  isSelected: boolean
  isSaving: boolean
  onSelect: (id: string | number) => void
  onDelete: (id: string | number) => void
  isCollapsed?: boolean
}

function ServiceCardThumbnail({ image, title }: { image: File | string | null; title: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else if (typeof image === 'string') {
      setPreviewUrl(image)
    } else {
      setPreviewUrl(null)
    }
  }, [image])

  if (previewUrl) {
    return <img src={previewUrl} alt={title} className={styles.thumbnail} />
  }

  return (
    <div className={styles.thumbnailPlaceholder} aria-hidden="true">
      <ImageIcon size={16} />
    </div>
  )
}

export function SortableServiceItem({
  service,
  isSelected,
  isSaving,
  onSelect,
  onDelete,
  isCollapsed = false,
}: SortableServiceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 2 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.itemCard} ${isSelected ? styles.itemCardActive : ''} ${
        isDragging ? styles.dragging : ''
      } ${isCollapsed ? styles.itemCardCollapsed : ''}`}
      onClick={() => onSelect(service.id)}
    >
      {isCollapsed ? (
        <div className={styles.collapsedCardInner}>
          {/* Absolute Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className={styles.dragHandleCollapsed}
            title="Drag to reorder"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={12} />
          </div>

          <ServiceCardThumbnail image={service.image_url || service.image} title={service.title} />
          
          {/* Absolute Status Dot */}
          <span
            className={`${styles.statusDotCollapsed} ${
              service.status === 1 ? styles.statusDotActive : styles.statusDotInactive
            }`}
          />
        </div>
      ) : (
        <>
          <div className={styles.cardHeader}>
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className={styles.dragHandle}
              title="Drag to reorder"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical size={16} />
            </div>

            <ServiceCardThumbnail image={service.image_url || service.image} title={service.title} />
            
            <div className={styles.cardInfo}>
              <h4 className={styles.cardTitle}>{service.title || 'Untitled Service'}</h4>
              <p className={styles.cardSubtitle}>{service.subtitle || 'No subtitle'}</p>
              <div className={styles.cardMeta}>
                <span className={styles.orderLabel}>Order: {service.sort_order}</span>
                <StatusBadge status={service.status} />
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(service.id)
            }}
            aria-label="Delete service"
            disabled={isSaving}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
