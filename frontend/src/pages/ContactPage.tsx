import { PageHero } from '@/components/sections'
import { CtaSection } from '@/features/home/components'

export function ContactPage() {
  return (
    <>
      <title>Contact — BuildCo</title>
      <meta name="description" content="Get in touch with BuildCo. Whether you have a detailed brief or just a vision, our team responds within 24 hours." />
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
