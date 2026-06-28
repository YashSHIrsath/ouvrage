import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './SectionHeader.module.css'

type Alignment = 'left' | 'center' | 'right'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  tag?: string
  align?: Alignment
  actions?: ReactNode
  className?: string
}

const ALIGN_CLASS: Record<Alignment, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
}

export function SectionHeader({
  title,
  subtitle,
  tag,
  align = 'left',
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(styles.header, ALIGN_CLASS[align], className)}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
