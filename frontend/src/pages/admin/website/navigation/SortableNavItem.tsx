import { useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, ArrowUpRight } from 'lucide-react'
import { Switch, Select } from 'antd'
import type { NavItem, NavItemFormValues } from '@/features/navigation/types'
import type { Page } from '@/features/pages/types'
import styles from './NavigationPage.module.css'

interface SortableNavItemProps {
  item: NavItem
  pages: Page[]
  onUpdate: (id: number, values: NavItemFormValues) => void
  onDelete: (id: number) => void
  isUpdating?: boolean
}

export function SortableNavItem({ item, pages, onUpdate, onDelete, isUpdating }: SortableNavItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 2 : 'auto' as const,
  }

  const [localLabel,  setLocalLabel]  = useState(item.label)
  const [localHref,   setLocalHref]   = useState(item.href)
  const [localType,   setLocalType]   = useState<'page' | 'external'>(item.type)
  const [localPageId, setLocalPageId] = useState<number | null>(item.page_id)

  useEffect(() => { setLocalLabel(item.label)    }, [item.label])
  useEffect(() => { setLocalHref(item.href)      }, [item.href])
  useEffect(() => { setLocalType(item.type)      }, [item.type])
  useEffect(() => { setLocalPageId(item.page_id) }, [item.page_id])

  const buildPayload = (overrides: Partial<NavItemFormValues> = {}): NavItemFormValues => ({
    label:     localLabel,
    href:      localHref,
    type:      localType,
    page_id:   localPageId,
    is_navbar: item.is_navbar,
    is_footer: item.is_footer,
    status:    item.status === 9 ? 1 : item.status as 0 | 1,
    ...overrides,
  })

  const handleLabelBlur = () => {
    if (localLabel.trim() !== item.label) {
      onUpdate(item.id, buildPayload({ label: localLabel.trim() }))
    }
  }

  const handleHrefBlur = () => {
    if (localHref.trim() !== item.href) {
      onUpdate(item.id, buildPayload({ href: localHref.trim() }))
    }
  }

  const handleTypeChange = (newType: 'page' | 'external') => {
    setLocalType(newType)
    setLocalPageId(null)
    setLocalHref('')
    onUpdate(item.id, buildPayload({ type: newType, page_id: null, href: '' }))
  }

  const handlePageChange = (pageId: number) => {
    const page = pages.find(p => p.id === pageId)
    if (!page) return
    const newHref = `/${page.slug}`
    setLocalPageId(pageId)
    setLocalHref(newHref)
    onUpdate(item.id, buildPayload({ type: 'page', page_id: pageId, href: newHref }))
  }

  const handleNavbarToggle  = (checked: boolean) => onUpdate(item.id, buildPayload({ is_navbar: checked }))
  const handleFooterToggle  = (checked: boolean) => onUpdate(item.id, buildPayload({ is_footer: checked }))
  const handleStatusToggle  = () => {
    const nextStatus: 0 | 1 = item.status === 1 ? 0 : 1
    onUpdate(item.id, buildPayload({ status: nextStatus }))
  }

  const pageOptions = pages.map(p => ({ value: p.id, label: p.nav_label || p.title }))

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`${styles.row} ${isDragging ? styles.rowDragging : ''} ${item.status === 0 ? styles.rowHidden : ''}`}
    >
      {/* Drag handle — listeners scoped here so inputs/selects are not affected */}
      <button type="button" className={styles.grip} {...listeners} aria-label="Drag to reorder" tabIndex={-1}>
        <GripVertical size={15} />
      </button>

      {/* Type selector */}
      <Select
        value={localType}
        onChange={handleTypeChange}
        size="small"
        disabled={isUpdating}
        className={styles.typeSelect}
        popupMatchSelectWidth={false}
        options={[
          { value: 'page',     label: 'Page'         },
          { value: 'external', label: 'External URL'  },
        ]}
      />

      {/* Label */}
      <input
        className={styles.labelInput}
        value={localLabel}
        onChange={e => setLocalLabel(e.target.value)}
        onBlur={handleLabelBlur}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        placeholder="Label"
        disabled={isUpdating}
        aria-label="Nav item label"
      />

      {/* Page selector (type=page) or href input (type=external) */}
      {localType === 'page' ? (
        <Select
          value={localPageId}
          onChange={handlePageChange}
          size="small"
          disabled={isUpdating}
          placeholder="Select page…"
          className={styles.pageSelect}
          popupMatchSelectWidth={false}
          options={pageOptions}
          notFoundContent="No pages"
        />
      ) : (
        <input
          className={styles.hrefInput}
          value={localHref}
          onChange={e => setLocalHref(e.target.value)}
          onBlur={handleHrefBlur}
          onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
          placeholder="https://..."
          disabled={isUpdating}
          aria-label="Nav item href"
        />
      )}

      {/* Link — shows slug and opens href in new tab */}
      <a
        href={item.href || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkBtn}
        aria-label={`Open ${item.href}`}
        aria-disabled={!item.href}
        tabIndex={item.href ? 0 : -1}
        title={item.href}
      >
        <span className={styles.linkSlug}>{item.href || '—'}</span>
        <ArrowUpRight size={12} className={styles.linkIcon} />
      </a>

      {/* Navbar toggle */}
      <label className={styles.toggleCell}>
        <Switch size="small" checked={item.is_navbar} onChange={handleNavbarToggle} disabled={isUpdating} />
      </label>

      {/* Footer toggle */}
      <label className={styles.toggleCell}>
        <Switch size="small" checked={item.is_footer} onChange={handleFooterToggle} disabled={isUpdating} />
      </label>

      {/* Status chip */}
      <button
        type="button"
        className={`${styles.statusChip} ${item.status === 1 ? styles.statusActive : styles.statusHidden}`}
        onClick={handleStatusToggle}
        disabled={isUpdating}
        title={item.status === 1 ? 'Click to hide' : 'Click to activate'}
      >
        {item.status === 1 ? 'Active' : 'Hidden'}
      </button>

      {/* Delete */}
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDelete(item.id)}
        disabled={isUpdating}
        aria-label={`Delete ${item.label}`}
      >
        Delete
      </button>
    </div>
  )
}
