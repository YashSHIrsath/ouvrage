import { SiteContainer, SiteSectionHeader } from '@/components/sections'
import { TIMELINE } from '../../data/timeline'
import styles from './TimelineSection.module.css'

export function TimelineSection() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <SiteSectionHeader
          label="02 / History"
          title="OUR"
          titleHighlight="JOURNEY"
        />

        <div className={styles.track}>
          <div className={styles.rail} aria-hidden />
          {TIMELINE.map((m, i) => (
            <div key={m.year} className={i % 2 === 0 ? styles.item : `${styles.item} ${styles.itemRight}`}>
              <div className={styles.dot} aria-hidden />
              <div className={styles.card}>
                <span className={styles.year}>{m.year}</span>
                <h3 className={styles.title}>{m.title}</h3>
                <p className={styles.body}>{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
