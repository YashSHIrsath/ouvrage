import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { PROJECTS } from '../../data/projects'
import styles from './ProjectsPreview.module.css'

export function ProjectsPreview() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <SectionLabel>03 / Projects</SectionLabel>
          <div className={styles.headerRow}>
            <h2 className={styles.headline}>SELECTED WORK</h2>
            <Link to="/projects" className={styles.allLink}>
              All Projects <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <Link to="/projects" key={project.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={project.image} alt={project.title} className={styles.img} />
              </div>
              <div className={styles.overlay} />
              <div className={styles.meta}>
                <span className={styles.metaType}>{project.type}</span>
                <div className={styles.cardTitle}>{project.title}</div>
                <div className={styles.cardLocation}>{project.location} · {project.year}</div>
              </div>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  )
}
