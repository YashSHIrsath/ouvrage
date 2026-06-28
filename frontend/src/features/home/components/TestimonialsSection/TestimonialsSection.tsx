import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { TESTIMONIALS } from '../../data/testimonials'
import styles from './TestimonialsSection.module.css'

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const count = TESTIMONIALS.length

  const prev = () => setActive((p) => (p - 1 + count) % count)
  const next = () => setActive((p) => (p + 1) % count)

  const t = TESTIMONIALS[active]

  return (
    <section className={styles.section}>
      <SiteContainer>
        <SectionLabel>04 / Testimonials</SectionLabel>

        <div className={styles.layout}>
          {/* Decorative quotation mark */}
          <div className={styles.quoteDecor} aria-hidden>&ldquo;</div>

          {/* Quote + controls */}
          <div className={styles.content}>
            <blockquote className={styles.blockquote}>
              <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>

              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  <span className={styles.authorInitials}>{t.initials}</span>
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </blockquote>

            <div className={styles.controls}>
              <button
                className={styles.navBtn}
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={15} />
              </button>

              <div className={styles.dots}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className={styles.navBtn}
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight size={15} />
              </button>

              <span className={styles.counter}>
                {active + 1} / {count}
              </span>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
