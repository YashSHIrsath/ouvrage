import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { SERVICES } from '../../data/services'
import ctaBg from '@/assets/images/cta-bg.jpg'
import styles from './CtaSection.module.css'

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className={styles.section}>
      {/* Background image */}
      <img src={ctaBg} alt="" aria-hidden className={styles.bgImg} />
      <div className={styles.bgOverlay} />
      <div className={styles.bgGrid} aria-hidden />

      <SiteContainer className={styles.container}>
        <SectionLabel>06 / Contact</SectionLabel>

        <div className={styles.layout}>
          {/* Left: headline + contact details */}
          <div className={styles.left}>
            <h2 className={styles.headline}>
              START YOUR
              <br />
              <span className={styles.headlinePrimary}>PROJECT</span>
              <br />
              WITH US.
            </h2>

            <p className={styles.subtitle}>
              Whether you have a detailed brief or just a vision — we want to hear
              about it. Our team responds within 24 hours.
            </p>

            <div className={styles.contactList}>
              {[
                { label: 'Email',   value: 'hello@buildco.com' },
                { label: 'Phone',   value: '+1 (555) 000-0000' },
                { label: 'Offices', value: 'Dubai · London · Sydney' },
              ].map(({ label, value }) => (
                <div key={label} className={styles.contactItem}>
                  <div className={styles.contactDot} />
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>{label} — </span>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: enquiry form */}
          <div className={styles.formWrap}>
            <div className={styles.formTitle}>New Project Enquiry</div>

            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successTitle}>Message Received</div>
                <p className={styles.successText}>
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className={styles.field}
                />
                <input
                  type="text"
                  placeholder="Company / Organisation"
                  className={styles.field}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className={styles.field}
                />
                <select defaultValue="" className={styles.field}>
                  <option value="" disabled>Service Required</option>
                  {SERVICES.map((s) => (
                    <option key={s.num} value={s.title}>{s.title}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`${styles.field} ${styles.textarea}`}
                />
                <button type="submit" className={styles.submitBtn}>
                  Send Enquiry <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
