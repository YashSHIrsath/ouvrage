import { useState } from 'react'
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
      </SiteContainer>
    </section>
  )
}
