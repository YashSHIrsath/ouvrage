import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { TEAM } from '../../data/team'
import styles from './TeamSection.module.css'

export function TeamSection() {
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

        <div className={styles.grid}>
          {TEAM.map((member) => (
            <div key={member.name} className={styles.card}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.cardImg}
              />
              <div className={styles.gradient} />

              {/* Default info */}
              <div className={styles.info}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.role}>{member.role}</div>
              </div>

              {/* Hover overlay */}
              <div className={styles.overlay}>
                <div className={styles.overlayExp}>{member.experience} Experience</div>
                <div className={styles.overlayName}>{member.name}</div>
                <div className={styles.overlayRole}>{member.role}</div>
                <div className={styles.overlayLink}>
                  <ArrowUpRight size={13} className={styles.overlayIcon} />
                  <span className={styles.overlayLinkText}>View Profile</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
