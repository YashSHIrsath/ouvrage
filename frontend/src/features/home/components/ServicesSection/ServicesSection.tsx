import { useState } from 'react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { usePublicServices } from '@/features/services/hooks/usePublicServices'
import styles from './ServicesSection.module.css'

export function ServicesSection() {
  const { data: services = [], isLoading, isError } = usePublicServices()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setActiveIndex((prev) => (prev === i ? null : i))

  // 1. Loading State (Skeletons)
  if (isLoading) {
    return (
      <section className={styles.section}>
        <SiteContainer>
          <div className={styles.header}>
            <div>
              <SectionLabel>01 / Services</SectionLabel>
              <h2 className={styles.headline}>
                WHAT
                <br />
                WE DO
              </h2>
            </div>
            <p className={styles.tagline}>
              Five integrated
              <br />
              capabilities. One
              <br />
              coherent delivery.
            </p>
          </div>
        </SiteContainer>

        <div className={styles.list}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow}>
              <SiteContainer>
                <div className={styles.skeletonInner}>
                  <div className={`${styles.skeletonBar} ${styles.skeletonNum}`} />
                  <div className={`${styles.skeletonBar} ${styles.skeletonTitle}`} />
                  <div className={`${styles.skeletonBar} ${styles.skeletonSub}`} />
                </div>
              </SiteContainer>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // 2. Error State
  if (isError) {
    return (
      <section className={styles.section}>
        <SiteContainer>
          <div className={styles.errorBox} role="alert">
            <span>Unable to load services.</span>
          </div>
        </SiteContainer>
      </section>
    )
  }

  // 3. Empty State
  if (services.length === 0) {
    return (
      <section className={styles.section}>
        <SiteContainer>
          <div className={styles.emptyBox}>
            <span>No services available.</span>
          </div>
        </SiteContainer>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <div>
            <SectionLabel>01 / Services</SectionLabel>
            <h2 className={styles.headline}>
              WHAT
              <br />
              WE DO
            </h2>
          </div>
          <p className={styles.tagline}>
            Five integrated
            <br />
            capabilities. One
            <br />
            coherent delivery.
          </p>
        </div>
      </SiteContainer>

      <div className={styles.list}>
        {services.map((svc, i) => {
          const isOpen = activeIndex === i
          const bodyId = `service-body-${svc.id}`
          
          // Format the sort order index dynamically (e.g. 1 -> "01")
          const displayNum = String(i + 1).padStart(2, '0')
          
          // Parse tag pill items dynamically from the subtitle
          const tags = svc.subtitle
            ? svc.subtitle.split(/\s*[·•,]\s*/).map((t) => t.trim()).filter(Boolean)
            : []

          const description = svc.long_description || svc.short_description

          return (
            <div
              key={svc.id}
              className={isOpen ? `${styles.row} ${styles.rowActive}` : styles.row}
            >
              <SiteContainer>
                {/* Semantic button trigger for keyboard and screen reader access */}
                <button
                  type="button"
                  className={styles.rowHeader}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                >
                  <div className={styles.rowLeft}>
                    <span className={styles.num}>{displayNum}</span>
                    <h3 className={isOpen ? `${styles.title} ${styles.titleActive}` : styles.title}>
                      {svc.title}
                    </h3>
                    <span className={styles.subtitle}>{svc.subtitle}</span>
                  </div>
                  <div className={isOpen ? `${styles.toggle} ${styles.toggleOpen}` : styles.toggle} aria-hidden>
                    <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
                  </div>
                </button>

                {/* Expandable body */}
                <div
                  id={bodyId}
                  role="region"
                  aria-label={svc.title}
                  className={isOpen ? `${styles.body} ${styles.bodyOpen}` : styles.body}
                >
                  <div className={styles.bodyInner}>
                    <div className={styles.bodyContent}>
                      <p className={styles.desc}>{description}</p>
                      {tags.length > 0 && (
                        <div className={styles.tags}>
                          {tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SiteContainer>
            </div>
          )
        })}
      </div>
    </section>
  )
}
