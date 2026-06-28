import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Label.module.css'

interface LabelProps {
  children: ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
}

export function Label({ children, htmlFor, required, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn(styles.label, className)}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}
