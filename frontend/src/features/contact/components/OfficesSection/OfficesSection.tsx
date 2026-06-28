import { SiteContainer } from '@/components/sections'
import { OFFICES } from '../../data/offices'
import styles from './OfficesSection.module.css'

export function OfficesSection() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.eyebrow}>Our Offices</div>
        <div className={styles.grid}>
          {OFFICES.map((office) => (
            <div key={office.city} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.city}>{office.city}</div>
                <div className={styles.country}>{office.country}</div>
              </div>
              <address className={styles.address}>{office.address}</address>
              <div className={styles.contact}>
                <div className={styles.contactLine}>{office.phone}</div>
                <div className={styles.contactLine}>{office.email}</div>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
