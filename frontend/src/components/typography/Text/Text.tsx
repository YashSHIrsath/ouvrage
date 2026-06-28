import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Text.module.css'

type TextSize = 'sm' | 'base' | 'lg'

interface TextProps {
  size?: TextSize
  secondary?: boolean
  children: ReactNode
  className?: string
}

const SIZE_CLASS: Record<TextSize, string> = {
  sm: styles.sm,
  base: styles.base,
  lg: styles.lg,
}

export function Text({ size = 'base', secondary, children, className }: TextProps) {
  return (
    <p
      className={cn(
        styles.text,
        SIZE_CLASS[size],
        secondary && styles.secondary,
        className,
      )}
    >
      {children}
    </p>
  )
}
