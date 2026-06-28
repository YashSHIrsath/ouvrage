import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { PROJECTS } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
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
              src={PROJECTS[0].image}
              alt={PROJECTS[0].title}
              className={styles.cardImg}
            />
            <div className={styles.gradientBottom} />
            <div className={styles.cardInfo}>
              <div className={styles.cardMeta}>
                <span className={styles.cardId}>{PROJECTS[0].id}</span>
                <div className={styles.metaDash} />
                <span className={styles.cardType}>{PROJECTS[0].type}</span>
              </div>
              <h3 className={styles.cardTitle}>{PROJECTS[0].title}</h3>
              <div className={styles.cardFooter}>
                <div className={styles.cardDetails}>
                  <span className={styles.cardDetail}>{PROJECTS[0].location}</span>
                  <span className={styles.cardDetail}>{PROJECTS[0].area}</span>
                </div>
                <div className={styles.cardArrow}>
                  <ArrowUpRight size={14} className={styles.cardArrowIcon} />
                </div>
              </div>
            </div>
          </div>

          {/* Right stacked pair */}
          <div className={styles.stackedPair}>
            {PROJECTS.slice(1, 3).map((proj) => (
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
        </div>

        {/* Bottom wide strip */}
        <div className={styles.cardWide}>
          <img
            src={PROJECTS[3].image}
            alt={PROJECTS[3].title}
            className={styles.cardImg}
          />
          <div className={styles.gradientRight} />
          <div className={styles.wideInfo}>
            <div className={styles.wideLeft}>
              <span className={styles.cardId}>{PROJECTS[3].id}</span>
              <h3 className={styles.wideTitleText}>{PROJECTS[3].title}</h3>
              <div className={styles.wideMeta}>
                <span className={styles.cardDetail}>{PROJECTS[3].location}</span>
                <span className={styles.metaSep}>·</span>
                <span className={styles.cardDetail}>{PROJECTS[3].type}</span>
                <span className={styles.metaSep}>·</span>
                <span className={styles.cardDetail}>{PROJECTS[3].area}</span>
              </div>
            </div>
            <div className={styles.cardArrow}>
              <ArrowUpRight size={14} className={styles.cardArrowIcon} />
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
