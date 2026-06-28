import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './SectionCard.module.css'

interface SectionCardProps {
  title?: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  className?: string
}

export function SectionCard({ title, description, children, actions, className }: SectionCardProps) {
  return (
    <div className={cn(styles.card, className)}>
      {(title || description || actions) && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.headerActions}>{actions}</div>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  )
}
