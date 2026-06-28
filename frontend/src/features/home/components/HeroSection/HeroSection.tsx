import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer } from '@/components/sections'
import { STATS } from '../../data/stats'
import { PROJECTS } from '../../data/projects'
import heroImg from '@/assets/images/hero-bg.jpg'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden />

      <div className={styles.body}>
        {/* Left content panel */}
        <div className={styles.left}>
          <div>
            <div className={styles.eyebrow}>
              <div className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Est. 1996 · Dubai · London · Sydney</span>
            </div>

            <h1 className={styles.headline}>
              BUILDING
              <span className={styles.headlineHollow}>THE</span>
              FUTURE
            </h1>

            <p className={styles.subtitle}>
              Premium construction, land development, and architectural design for
              projects that define skylines and stand the test of time.
            </p>

            <div className={styles.ctaGroup}>
              <Link to="/projects" className={styles.ctaPrimary}>
                View Projects <ArrowUpRight size={13} />
              </Link>
              <Link to="/about" className={styles.ctaSecondary}>
                Our Story
              </Link>
            </div>
          </div>

          <div className={styles.scrollCue} aria-hidden>
            <div className={styles.scrollBox}>
              <div className={styles.scrollDot} />
            </div>
            <span className={styles.scrollText}>Scroll to explore</span>
          </div>
        </div>

        {/* Right image panel — hidden on mobile */}
        <div className={styles.right}>
          <img src={heroImg} alt="Construction crane against dramatic sky" className={styles.heroImg} />
          <div className={styles.heroGradientLeft} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroStripe} />

          {/* Floating project badge */}
          <div className={styles.heroBadge}>
            <div className={styles.badgeLabel}>Latest Project</div>
            <div className={styles.badgeTitle}>{PROJECTS[0].title}</div>
            <div className={styles.badgeMeta}>
              <span className={styles.badgeMetaText}>{PROJECTS[0].location}</span>
              <span className={styles.badgeDot}>·</span>
              <span className={styles.badgeMetaText}>{PROJECTS[0].year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <SiteContainer>
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={i === 0 ? `${styles.statValue} ${styles.statPrimary}` : styles.statValue}>
                  {stat.value}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </SiteContainer>
      </div>
    </section>
  )
}
