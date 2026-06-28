import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { TEAM } from '../../data/team'
import styles from './TeamSection.module.css'

export function TeamSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <SectionLabel>05 / Team</SectionLabel>
          <h2 className={styles.headline}>
            THE PEOPLE
            <br />
            BEHIND THE WORK
          </h2>
        </div>

        <div className={styles.grid} ref={ref}>
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={
                visible
                  ? `${styles.card} ${styles.cardVisible} ${styles[`cardDelay${i}`]}`
                  : styles.card
              }
            >
              <img
                src={member.image}
                alt={member.name}
                className={styles.cardImg}
              />
              <div className={styles.gradient} />

              {/* Default: name + role visible at bottom */}
              <div className={styles.info}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.role}>{member.role}</div>
              </div>

              {/* Hover overlay: reveals experience + full info; no navigation implied */}
              <div className={styles.overlay} aria-hidden>
                <div className={styles.overlayExp}>{member.experience} Experience</div>
                <div className={styles.overlayName}>{member.name}</div>
                <div className={styles.overlayRole}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
