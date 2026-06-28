import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import styles from './CtaBanner.module.css'

interface CtaBannerProps {
  label?: string
  title?: string
  titleHighlight?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export function CtaBanner({
  label        = '05 / Start Here',
  title        = 'READY TO BUILD SOMETHING',
  titleHighlight = 'REMARKABLE?',
  description  = 'Whether you have a detailed brief or just a vision — we want to hear about it. Our team responds within 24 hours.',
  primaryLabel = 'Get a Quote',
  primaryTo    = '/contact',
  secondaryLabel,
  secondaryTo  = '/projects',
}: CtaBannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.accentBar} aria-hidden />

      <SiteContainer className={styles.container}>
        <div className={styles.layout}>
          <div>
            <SectionLabel>{label}</SectionLabel>
            <h2 className={styles.headline}>
              {title}
              {titleHighlight && (
                <>
                  <br />
                  <span className={styles.headlinePrimary}>{titleHighlight}</span>
                </>
              )}
            </h2>
          </div>

          <div>
            <p className={styles.body}>{description}</p>
            <div className={styles.actions}>
              <Link to={primaryTo} className={styles.primaryBtn}>
                {primaryLabel} <ArrowUpRight size={14} />
              </Link>
              {secondaryLabel && (
                <Link to={secondaryTo} className={styles.secondaryBtn}>
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
