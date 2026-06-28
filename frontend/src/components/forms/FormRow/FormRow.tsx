import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './FormRow.module.css'

interface FormRowProps {
  children: ReactNode
  cols?: 1 | 2 | 3
  className?: string
}

export function FormRow({ children, cols = 2, className }: FormRowProps) {
  return (
    <div className={cn(styles.row, styles[`cols${cols}`], className)}>
      {children}
    </div>
  )
}
