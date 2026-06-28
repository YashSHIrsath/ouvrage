import { SiteContainer } from '../SiteContainer/SiteContainer'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './PageHero.module.css'

export interface HeroStat {
  value: string
  label: string
}

interface PageHeroProps {
  label: string
  headline: string
  headlineSub?: string
  subtitle?: string
  /** Optional stats displayed in the right column on desktop */
  sideStats?: HeroStat[]
  /** Optional large faded decorative word shown in the right column */
  sideAccent?: string
}

export function PageHero({ label, headline, headlineSub, subtitle, sideStats, sideAccent }: PageHeroProps) {
  const hasSide = !!(sideStats?.length || sideAccent)

  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden />
      <SiteContainer>
        <div className={hasSide ? `${styles.layout} ${styles.layoutSplit}` : styles.layout}>
          {/* Left content */}
          <div className={styles.content}>
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
          </div>

          {/* Right visual — only rendered when side content is provided */}
          {hasSide && (
            <div className={styles.side} aria-hidden>
              {sideStats && (
                <div className={styles.sideStats}>
                  {sideStats.map((s) => (
                    <div key={s.label} className={styles.sideStat}>
                      <div className={styles.sideStatValue}>{s.value}</div>
                      <div className={styles.sideStatLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {sideAccent && (
                <div className={styles.sideAccent}>{sideAccent}</div>
              )}
            </div>
          )}
        </div>
      </SiteContainer>
    </section>
  )
}
