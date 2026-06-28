import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { SERVICES } from '../../data/services'
import styles from './ServicesPreview.module.css'

export function ServicesPreview() {
  const featured = SERVICES.slice(0, 3)

  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <SectionLabel>02 / Services</SectionLabel>
          <div className={styles.headerRight}>
            <h2 className={styles.headline}>WHAT WE BUILD</h2>
            <Link to="/services" className={styles.allLink}>
              All Services <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {featured.map((service) => (
            <div key={service.num} className={styles.card}>
              <div className={styles.cardNum}>{service.num}</div>
              <div className={styles.cardTitle}>{service.title}</div>
              <div className={styles.cardSub}>{service.subtitle}</div>
              <div className={styles.cardTags}>
                {service.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
