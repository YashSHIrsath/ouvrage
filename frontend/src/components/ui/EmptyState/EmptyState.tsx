import { Empty } from 'antd'
import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <Empty
        image={icon ?? Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className={styles.content}>
            {title && <span className={styles.title}>{title}</span>}
            {description && <span className={styles.description}>{description}</span>}
          </div>
        }
      />
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
