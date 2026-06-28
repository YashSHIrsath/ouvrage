import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { usePublicServices } from '@/features/services/hooks/usePublicServices'
import styles from './ServicesPreview.module.css'

export function ServicesPreview() {
  const { data: services = [], isLoading, isError } = usePublicServices()
  const featured = services.slice(0, 3)

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

        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`${styles.card} ${styles.cardSkeleton}`}>
                <div className={`${styles.skeletonBar} ${styles.skeletonNum}`} />
                <div className={`${styles.skeletonBar} ${styles.skeletonTitle}`} />
                <div className={`${styles.skeletonBar} ${styles.skeletonSub}`} />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className={styles.errorBox} role="alert">
            <span>Unable to load services.</span>
          </div>
        ) : featured.length === 0 ? (
          <div className={styles.emptyBox}>
            <span>No services available.</span>
          </div>
        ) : (
          <div className={styles.grid}>
            {featured.map((service, i) => {
              const displayNum = String(i + 1).padStart(2, '0')
              const tags = service.subtitle
                ? service.subtitle.split(/\s*[·•,]\s*/).map((t) => t.trim()).filter(Boolean)
                : []
              
              return (
                <div key={service.id} className={styles.card}>
                  <div className={styles.cardNum}>{displayNum}</div>
                  <div className={styles.cardTitle}>{service.title}</div>
                  <div className={styles.cardSub}>{service.subtitle}</div>
                  {tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </SiteContainer>
    </section>
  )
}
