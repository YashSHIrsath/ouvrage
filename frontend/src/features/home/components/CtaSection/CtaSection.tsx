import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowUpRight } from 'lucide-react'
import { SiteContainer, SectionLabel } from '@/components/sections'
import { SERVICES } from '../../data/services'
import ctaBg from '@/assets/images/cta-bg.jpg'
import styles from './CtaSection.module.css'

const schema = z.object({
  enquiry_type: z.string().min(1, 'Please select an enquiry type'),
  name:         z.string().min(2, 'Full name is required'),
  company:      z.string().optional(),
  email:        z.string().email('Please enter a valid email address'),
  service:      z.string().optional(),
  budget:       z.string().optional(),
  timeline:     z.string().optional(),
  message:      z.string().min(10, 'Please describe your project (minimum 10 characters)'),
})

type FormData = z.infer<typeof schema>

const ENQUIRY_TYPES = [
  { value: 'request_quote',  label: 'Request a Quote' },
  { value: 'consultation',   label: 'Schedule a Consultation' },
  { value: 'general',        label: 'General Question' },
  { value: 'partnership',    label: 'Partnership' },
]

const BUDGET_RANGES = [
  { value: 'under_500k',   label: 'Under $500K' },
  { value: '500k_2m',      label: '$500K – $2M' },
  { value: '2m_10m',       label: '$2M – $10M' },
  { value: 'over_10m',     label: '$10M+' },
  { value: 'undisclosed',  label: 'Prefer not to say' },
]

const TIMELINES = [
  { value: '3_6m',  label: '3 – 6 months' },
  { value: '6_12m', label: '6 – 12 months' },
  { value: '1_2y',  label: '1 – 2 years' },
  { value: '2y_',   label: '2+ years' },
  { value: 'tbd',   label: 'To be determined' },
]

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [searchParams] = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)
  const formWrapRef = useRef<HTMLDivElement>(null)

  const isQuoteRequest = searchParams.get('enquiry') === 'quote'
  const enquiryDefault = isQuoteRequest ? 'request_quote' : ''

  useEffect(() => {
    if (!isQuoteRequest) return
    // Wait for paint, then scroll the section into view and highlight the form
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setHighlighted(true)
      // Focus the Enquiry Type select after scroll settles
      setTimeout(() => {
        formWrapRef.current?.querySelector<HTMLSelectElement>('select')?.focus()
      }, 900)
      setTimeout(() => setHighlighted(false), 2400)
    }, 300)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { enquiry_type: enquiryDefault },
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} className={styles.section}>
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
          <div
            ref={formWrapRef}
            className={highlighted ? `${styles.formWrap} ${styles.formWrapHighlighted}` : styles.formWrap}
          >
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

                {/* Enquiry Type — full width, first field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="ctaEnquiryType" className={styles.fieldLabel}>
                    Enquiry Type <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="ctaEnquiryType"
                    className={styles.field}
                    aria-invalid={!!errors.enquiry_type}
                    aria-describedby={errors.enquiry_type ? 'ctaEnquiryType-error' : undefined}
                    {...register('enquiry_type')}
                  >
                    <option value="" disabled>Select enquiry type</option>
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {errors.enquiry_type && (
                    <span id="ctaEnquiryType-error" className={styles.fieldError} role="alert">
                      {errors.enquiry_type.message}
                    </span>
                  )}
                </div>

                {/* Name + Company row */}
                <div className={styles.fieldRow}>
                  {/* Floating label: Full Name */}
                  <div className={styles.fieldFloat}>
                    <input
                      id="ctaName"
                      type="text"
                      placeholder=" "
                      className={styles.field}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'ctaName-error' : undefined}
                      {...register('name')}
                    />
                    <label htmlFor="ctaName" className={styles.fieldLabel}>
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    {errors.name && (
                      <span id="ctaName-error" className={styles.fieldError} role="alert">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Floating label: Company */}
                  <div className={styles.fieldFloat}>
                    <input
                      id="ctaCompany"
                      type="text"
                      placeholder=" "
                      className={styles.field}
                      {...register('company')}
                    />
                    <label htmlFor="ctaCompany" className={styles.fieldLabel}>
                      Company / Organisation
                    </label>
                  </div>
                </div>

                {/* Email + Budget row */}
                <div className={styles.fieldRow}>
                  {/* Floating label: Email */}
                  <div className={styles.fieldFloat}>
                    <input
                      id="ctaEmail"
                      type="email"
                      placeholder=" "
                      className={styles.field}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'ctaEmail-error' : undefined}
                      {...register('email')}
                    />
                    <label htmlFor="ctaEmail" className={styles.fieldLabel}>
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    {errors.email && (
                      <span id="ctaEmail-error" className={styles.fieldError} role="alert">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Budget Range */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="ctaBudget" className={styles.fieldLabel}>
                      Budget Range
                    </label>
                    <select
                      id="ctaBudget"
                      className={styles.field}
                      defaultValue=""
                      {...register('budget')}
                    >
                      <option value="" disabled>Select budget range</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service + Timeline row */}
                <div className={styles.fieldRow}>
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

                  <div className={styles.fieldGroup}>
                    <label htmlFor="ctaTimeline" className={styles.fieldLabel}>
                      Project Timeline
                    </label>
                    <select
                      id="ctaTimeline"
                      className={styles.field}
                      defaultValue=""
                      {...register('timeline')}
                    >
                      <option value="" disabled>Select timeline</option>
                      {TIMELINES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project brief — full width floating label */}
                <div className={styles.fieldFloat}>
                  <textarea
                    id="ctaMessage"
                    placeholder=" "
                    rows={4}
                    className={`${styles.field} ${styles.textarea}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'ctaMessage-error' : undefined}
                    {...register('message')}
                  />
                  <label htmlFor="ctaMessage" className={styles.fieldLabel}>
                    Project Brief <span className={styles.required}>*</span>
                  </label>
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
