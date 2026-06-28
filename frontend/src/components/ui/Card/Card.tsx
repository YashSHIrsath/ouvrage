import { Card as AntCard } from 'antd'
import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  title?: ReactNode
  extra?: ReactNode
  hoverable?: boolean
  className?: string
}

export function Card({ children, title, extra, hoverable, className }: CardProps) {
  return (
    <AntCard
      title={title}
      extra={extra}
      hoverable={hoverable}
      className={cn(styles.card, className)}
    >
      {children}
    </AntCard>
  )
}
