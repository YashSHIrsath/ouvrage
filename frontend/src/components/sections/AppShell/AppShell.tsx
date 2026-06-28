import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: ReactNode
  narrow?: boolean
  className?: string
}

export function AppShell({ children, narrow, className }: AppShellProps) {
  return (
    <div className={cn(styles.shell, narrow && styles.narrow, className)}>
      {children}
    </div>
  )
}
