import type { ReactNode } from 'react'
import { cn } from '@/utils'
import { AppShell } from '../AppShell/AppShell'
import styles from './SectionContainer.module.css'

type SectionPadding = 'sm' | 'md' | 'lg'
type SectionBackground = 'default' | 'alternate'

interface SectionContainerProps {
  children: ReactNode
  id?: string
  paddingY?: SectionPadding
  background?: SectionBackground
  className?: string
}

const PADDING_CLASS: Record<SectionPadding, string> = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
}

const BG_CLASS: Record<SectionBackground, string> = {
  default: styles.bgDefault,
  alternate: styles.bgAlternate,
}

export function SectionContainer({
  children,
  id,
  paddingY = 'md',
  background = 'default',
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(styles.section, PADDING_CLASS[paddingY], BG_CLASS[background], className)}
    >
      <AppShell>{children}</AppShell>
    </section>
  )
}
