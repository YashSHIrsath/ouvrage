import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { VALUES } from '../../data/values'
import styles from './MissionValuesSection.module.css'

export function MissionValuesSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <SectionLabel>Our Values</SectionLabel>
          <p className={styles.intro}>
            Four principles that guide every decision we make — from how we
            scope a project to how we handle the unexpected.
          </p>
        </div>

        <div className={styles.mission}>
          <div className={styles.missionLine} aria-hidden />
          <div className={styles.missionLabel}>Our Mission</div>
          <p className={styles.missionText}>
            To deliver built environments that raise the standard of what
            construction can achieve — through integration, craft, and an
            unrelenting commitment to our clients.
          </p>
        </div>

        <div className={styles.grid} ref={ref}>
          {VALUES.map((v, i) => (
            <div
              key={v.num}
              className={
                visible
                  ? `${styles.card} ${styles.cardVisible} ${styles[`cardDelay${i}`]}`
                  : styles.card
              }
            >
              <div className={styles.num}>{v.num}</div>
              <div className={styles.valueTitle}>{v.title}</div>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
