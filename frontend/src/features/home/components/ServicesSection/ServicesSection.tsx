import { useState } from 'react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { SERVICES } from '../../data/services'
import styles from './ServicesSection.module.css'

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setActiveIndex((prev) => (prev === i ? null : i))

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
        {SERVICES.map((svc, i) => {
          const isOpen = activeIndex === i
          const bodyId = `service-body-${i}`
          return (
            <div
              key={svc.num}
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
                    <span className={styles.num}>{svc.num}</span>
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
                      <p className={styles.desc}>{svc.description}</p>
                      <div className={styles.tags}>
                        {svc.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
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
