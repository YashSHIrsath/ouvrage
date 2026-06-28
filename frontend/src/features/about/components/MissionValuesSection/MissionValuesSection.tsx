import { SiteContainer, SectionLabel } from '@/components/sections'
import styles from './MissionValuesSection.module.css'

const VALUES = [
  {
    num: '01',
    title: 'Precision',
    body: 'Engineering decisions made at the micro level determine outcomes at the macro scale. We execute every detail with the same rigor we bring to the whole.',
  },
  {
    num: '02',
    title: 'Integrity',
    body: 'We give honest assessments, honor commitments, and take responsibility when things are difficult. Our clients trust us because we have earned that trust.',
  },
  {
    num: '03',
    title: 'Scale',
    body: 'We are built for complexity. Large footprint, multi-stakeholder, technically challenging projects are where our integrated model delivers its greatest advantage.',
  },
  {
    num: '04',
    title: 'Partnership',
    body: 'We think of ourselves as extensions of our clients\' teams. Their goals become our goals. Their success is our measure of success.',
  },
]

export function MissionValuesSection() {
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

        <div className={styles.grid}>
          {VALUES.map((v) => (
            <div key={v.num} className={styles.card}>
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
