import { cn } from '@/utils'
import styles from './StatusBadge.module.css'

// Supports both numeric status (1/0/9) and named variants
type StatusValue = 1 | 0 | 9
type StatusVariant = 'active' | 'inactive' | 'deleted'

interface StatusBadgeProps {
  status?: StatusValue
  variant?: StatusVariant
  className?: string
}

const STATUS_MAP: Record<StatusValue, StatusVariant> = {
  1: 'active',
  0: 'inactive',
  9: 'deleted',
}

const LABEL_MAP: Record<StatusVariant, string> = {
  active:   'Active',
  inactive: 'Inactive',
  deleted:  'Deleted',
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const resolvedVariant: StatusVariant =
    variant ?? (status !== undefined ? STATUS_MAP[status] : 'inactive')

  return (
    <span className={cn(styles.badge, styles[resolvedVariant], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {LABEL_MAP[resolvedVariant]}
    </span>
  )
}
