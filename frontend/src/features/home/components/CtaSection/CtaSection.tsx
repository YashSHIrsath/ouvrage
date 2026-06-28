import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { SERVICES } from '../../data/services'
import ctaBg from '@/assets/images/cta-bg.jpg'
import styles from './CtaSection.module.css'

const schema = z.object({
  name:    z.string().min(2, 'Full name is required'),
  company: z.string().optional(),
  email:   z.string().email('Please enter a valid email address'),
  service: z.string().optional(),
  message: z.string().min(10, 'Please describe your project (minimum 10 characters)'),
})

type FormData = z.infer<typeof schema>

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (_data: FormData) => {
    // TODO: replace with API call when backend is ready
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
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
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full Name */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaName" className={styles.fieldLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="ctaName"
                    type="text"
                    placeholder="e.g. Marcus Holt"
                    className={styles.field}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'ctaName-error' : undefined}
                    {...register('name')}
                  />
                  {errors.name && (
                    <span id="ctaName-error" className={styles.fieldError} role="alert">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Company */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaCompany" className={styles.fieldLabel}>
                    Company / Organisation
                  </label>
                  <input
                    id="ctaCompany"
                    type="text"
                    placeholder="e.g. Meridian Group"
                    className={styles.field}
                    {...register('company')}
                  />
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaEmail" className={styles.fieldLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="ctaEmail"
                    type="email"
                    placeholder="e.g. m.holt@meridian.com"
                    className={styles.field}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'ctaEmail-error' : undefined}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span id="ctaEmail-error" className={styles.fieldError} role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Service */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaService" className={styles.fieldLabel}>
                    Service Required
                  </label>
                  <select
                    id="ctaService"
                    className={styles.field}
                    defaultValue=""
                    {...register('service')}
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.num} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaMessage" className={styles.fieldLabel}>
                    Project Brief <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="ctaMessage"
                    placeholder="Tell us about your project — location, scale, timeline..."
                    rows={4}
                    className={`${styles.field} ${styles.textarea}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'ctaMessage-error' : undefined}
                    {...register('message')}
                  />
                  {errors.message && (
                    <span id="ctaMessage-error" className={styles.fieldError} role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>Send Enquiry <ArrowUpRight size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
