import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { TESTIMONIALS } from '../../data/testimonials'
import styles from './TestimonialPreview.module.css'

export function TestimonialPreview() {
  const t = TESTIMONIALS[0]

  return (
    <section className={styles.section}>
      <SiteContainer>
        <SectionLabel>04 / Client Voice</SectionLabel>

        <div className={styles.layout}>
          <div className={styles.mark} aria-hidden>&ldquo;</div>

          <div>
            <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>

            <div className={styles.author}>
              <div className={styles.avatar}>{t.initials}</div>
              <div>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorRole}>{t.role}</div>
              </div>
            </div>

            <Link to="/testimonials" className={styles.allLink}>
              Read All Testimonials <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
