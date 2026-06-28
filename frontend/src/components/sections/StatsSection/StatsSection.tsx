import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SiteContainer } from '../SiteContainer/SiteContainer'
import styles from './StatsSection.module.css'

export interface StatItem {
  value: string
  label: string
}

interface StatsSectionProps {
  stats: StatItem[]
  className?: string
}

export function StatsSection({ stats, className }: StatsSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <SiteContainer>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={visible ? `${styles.item} ${styles.itemVisible}` : styles.item}
            >
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
