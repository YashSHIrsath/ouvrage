import { SiteContainer, SectionLabel } from '@/components/sections'
import aboutImg from '@/assets/images/about-team.jpg'
import styles from './AboutPreviewSection.module.css'

export function AboutPreviewSection() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.grid}>
          {/* Left: display statement */}
          <div className={styles.left}>
            <SectionLabel>00 / About</SectionLabel>
            <h2 className={styles.headline}>
              WE DON&apos;T
              <br />
              BUILD
              <br />
              <span className={styles.headlineHollow}>BUILDINGS.</span>
              <br />
              WE BUILD
              <br />
              LEGACIES.
            </h2>
            <div className={styles.since}>
              <div className={styles.sinceLine} />
              <span className={styles.sinceText}>BuildCo Group · Since 1996</span>
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.divider} aria-hidden />

          {/* Right: body copy + image */}
          <div className={styles.right}>
            <p className={styles.body}>
              Founded in 1996, BuildCo has grown from a regional construction firm into
              a globally respected integrated development group — with operations spanning
              the Middle East, Europe, and Asia Pacific.
            </p>
            <p className={styles.body}>
              What sets us apart is integration. Architecture, engineering, construction,
              and project management unified under one roof, operating as one team. No
              silos. No coordination gaps. Seamless delivery from concept to completion.
            </p>
            <p className={styles.body}>
              Our projects range from landmark towers and master-planned communities to
              precision industrial facilities. The common thread is an uncompromising
              standard of craft and a deep respect for what we are building — and for whom.
            </p>

            <div className={styles.imageWrap}>
              <img
                src={aboutImg}
                alt="BuildCo team on construction site"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
              <span className={styles.imageCaption}>
                On-Site · Meridian Tower · Dubai, UAE
              </span>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
