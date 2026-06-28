import { cn } from '@/utils'
import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn(styles.label, className)}>
      <span className={styles.text}>{children}</span>
      <div className={styles.line} />
    </div>
  )
}
