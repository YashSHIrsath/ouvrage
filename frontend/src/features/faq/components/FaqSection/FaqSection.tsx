import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { FAQ } from '../../data/faq'
import styles from './FaqSection.module.css'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className={styles.section}>
      <SiteContainer>
        <SectionLabel>Common Questions</SectionLabel>

        <div className={styles.layout}>
          {/* Accordion list */}
          <div className={styles.list}>
            {FAQ.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div key={i} className={styles.item}>
                  <button
                    className={styles.trigger}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
                    <div className={styles.bodyInner}>
                      <p className={styles.answer}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right info panel (desktop only) */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <p className={styles.sideLabel}>Still have questions?</p>
              <p className={styles.sideBody}>
                Our team responds to every enquiry within 24 hours.
                Reach out directly and we'll give you a straight answer.
              </p>
              <div className={styles.sideContacts}>
                <div className={styles.sideContact}>
                  <span className={styles.sideContactKey}>Email</span>
                  <span className={styles.sideContactVal}>hello@buildco.com</span>
                </div>
                <div className={styles.sideContact}>
                  <span className={styles.sideContactKey}>Phone</span>
                  <span className={styles.sideContactVal}>+1 (555) 000-0000</span>
                </div>
                <div className={styles.sideContact}>
                  <span className={styles.sideContactKey}>Offices</span>
                  <span className={styles.sideContactVal}>Dubai · London · Sydney</span>
                </div>
              </div>
              <Link to="/contact" className={styles.sideLink}>
                Contact Us <ArrowUpRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </SiteContainer>
    </section>
  )
}
