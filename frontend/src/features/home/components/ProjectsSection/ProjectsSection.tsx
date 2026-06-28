import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { PROJECTS } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
  const featured = PROJECTS[0] ?? null
  const stacked  = PROJECTS.slice(1, 3)
  const wide     = PROJECTS[3] ?? null

  if (!featured) return null

  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <div>
            <SectionLabel>02 / Projects</SectionLabel>
            <h2 className={styles.headline}>
              FEATURED
              <br />
              PROJECTS
            </h2>
          </div>
          <Link to="/projects" className={styles.viewAll}>
            View All Projects <ArrowUpRight size={14} className={styles.viewAllIcon} />
          </Link>
        </div>

        {/* Top grid: large portrait + 2 stacked */}
        <div className={styles.topGrid}>
          {/* Large featured card */}
          <div className={styles.cardLarge}>
            <img
              src={featured.image}
              alt={featured.title}
              className={styles.cardImg}
            />
            <div className={styles.gradientBottom} />
            <div className={styles.cardInfo}>
              <div className={styles.cardMeta}>
                <span className={styles.cardId}>{featured.id}</span>
                <div className={styles.metaDash} />
                <span className={styles.cardType}>{featured.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{featured.title}</h3>
              <div className={styles.cardFooter}>
                <div className={styles.cardDetails}>
                  <span className={styles.cardDetail}>{featured.location}</span>
                  <span className={styles.cardDetail}>{featured.area}</span>
                </div>
                <div className={styles.cardArrow}>
                  <ArrowUpRight size={14} className={styles.cardArrowIcon} />
                </div>
              </div>
            </div>
          </div>

          {/* Right stacked pair — only shown when at least 1 additional project exists */}
          {stacked.length > 0 && (
            <div className={styles.stackedPair}>
              {stacked.map((proj) => (
                <div key={proj.id} className={styles.cardSmall}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className={styles.cardImg}
                  />
                  <div className={styles.gradientBottom} />
                  <div className={styles.cardInfoSmall}>
                    <div className={styles.cardMetaSmall}>
                      <span className={styles.cardId}>{proj.id}</span>
                      <span className={styles.cardTypeSmall}>· {proj.type}</span>
                    </div>
                    <div className={styles.cardFooterSmall}>
                      <h3 className={styles.cardTitleSmall}>{proj.title}</h3>
                      <span className={styles.cardYear}>{proj.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom wide strip — only shown when a 4th project exists */}
        {wide && (
          <div className={styles.cardWide}>
            <img
              src={wide.image}
              alt={wide.title}
              className={styles.cardImg}
            />
            <div className={styles.gradientRight} />
            <div className={styles.wideInfo}>
              <div className={styles.wideLeft}>
                <span className={styles.cardId}>{wide.id}</span>
                <h3 className={styles.wideTitleText}>{wide.title}</h3>
                <div className={styles.wideMeta}>
                  <span className={styles.cardDetail}>{wide.location}</span>
                  <span className={styles.metaSep}>·</span>
                  <span className={styles.cardDetail}>{wide.type}</span>
                  <span className={styles.metaSep}>·</span>
                  <span className={styles.cardDetail}>{wide.area}</span>
                </div>
              </div>
              <div className={styles.cardArrow}>
                <ArrowUpRight size={14} className={styles.cardArrowIcon} />
              </div>
            </div>
          </div>
        )}
      </SiteContainer>
    </section>
  )
}
