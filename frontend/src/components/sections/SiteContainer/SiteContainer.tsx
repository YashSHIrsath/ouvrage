import { cn } from '@/utils'
import styles from './SiteContainer.module.css'

interface SiteContainerProps {
  children: React.ReactNode
  className?: string
}

export function SiteContainer({ children, className }: SiteContainerProps) {
  return (
    <div className={cn(styles.container, className)}>
      {children}
    </div>
  )
}
