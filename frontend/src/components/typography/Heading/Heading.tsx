import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4

interface HeadingProps {
  level?: HeadingLevel
  children: ReactNode
  className?: string
}

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const
const LEVEL_CLASS: Record<HeadingLevel, string> = {
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = TAGS[level]
  return (
    <Tag className={cn(styles.heading, LEVEL_CLASS[level], className)}>
      {children}
    </Tag>
  )
}
