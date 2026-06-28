import { PageHero } from '@/components/sections'
import { CtaSection } from '@/features/home/components'

export function ContactPage() {
  return (
    <>
      <PageHero
        label="06 / Contact"
        headline="GET IN"
        headlineSub="TOUCH"
        subtitle="Whether you have a detailed brief or just a vision — we want to hear about it. Our team responds within 24 hours."
      />
      <CtaSection />
    </>
  )
}
