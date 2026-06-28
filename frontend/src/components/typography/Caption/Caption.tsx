import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Caption.module.css'

interface CaptionProps {
  children: ReactNode
  className?: string
}

export function Caption({ children, className }: CaptionProps) {
  return <span className={cn(styles.caption, className)}>{children}</span>
}
