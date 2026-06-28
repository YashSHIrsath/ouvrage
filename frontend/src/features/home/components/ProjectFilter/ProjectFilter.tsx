import { SiteContainer } from '@/components/sections'
import styles from './ProjectFilter.module.css'

export interface FilterCategory {
  key: string
  label: string
}

const CATEGORIES: FilterCategory[] = [
  { key: 'all',         label: 'All' },
  { key: 'commercial',  label: 'Commercial' },
  { key: 'residential', label: 'Residential' },
  { key: 'industrial',  label: 'Industrial' },
]

interface ProjectFilterProps {
  active?: string
  onChange?: (key: string) => void
}

export function ProjectFilter({ active = 'all', onChange }: ProjectFilterProps) {
  return (
    <div className={styles.outer}>
      <SiteContainer>
        <div className={styles.wrap}>
          <div className={styles.label}>Filter</div>
          <div className={styles.pills}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={
                  cat.key === active
                    ? `${styles.pill} ${styles.pillActive}`
                    : styles.pill
                }
                onClick={() => onChange?.(cat.key)}
                aria-pressed={cat.key === active}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}
