import { SiteContainer } from '@/components/sections'
import { CLIENTS } from '@/features/home/data/clients'
import styles from './ClientLogosStrip.module.css'

export function ClientLogosStrip() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.eyebrow}>Trusted By</div>
        <div className={styles.strip}>
          {CLIENTS.map((name) => (
            <div key={name} className={styles.logoItem}>
              {name}
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
