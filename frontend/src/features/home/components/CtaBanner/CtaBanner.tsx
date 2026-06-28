import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import styles from './CtaBanner.module.css'

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden />
      <div className={styles.accentBar} aria-hidden />

      <SiteContainer className={styles.container}>
        <div className={styles.layout}>
          <div>
            <SectionLabel>05 / Start Here</SectionLabel>
            <h2 className={styles.headline}>
              READY TO
              <br />
              BUILD
              <br />
              <span className={styles.headlinePrimary}>SOMETHING</span>
              <br />
              REMARKABLE?
            </h2>
          </div>

          <div>
            <p className={styles.body}>
              Whether you have a detailed brief or just a vision — we want to
              hear about it. Our team responds within 24 hours.
            </p>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.primaryBtn}>
                Get a Quote <ArrowUpRight size={14} />
              </Link>
              <Link to="/projects" className={styles.secondaryBtn}>
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
