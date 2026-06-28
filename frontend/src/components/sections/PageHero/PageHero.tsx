import { SiteContainer } from '../SiteContainer/SiteContainer'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './PageHero.module.css'

interface PageHeroProps {
  label: string
  headline: string
  headlineSub?: string
  subtitle?: string
}

export function PageHero({ label, headline, headlineSub, subtitle }: PageHeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden />
      <SiteContainer>
        <SectionLabel>{label}</SectionLabel>
        <div className={styles.accentLine} aria-hidden />
        <h1 className={styles.headline}>
          {headline}
          {headlineSub && (
            <>
              <br />
              <span className={styles.headlinePrimary}>{headlineSub}</span>
            </>
          )}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </SiteContainer>
    </section>
  )
}
