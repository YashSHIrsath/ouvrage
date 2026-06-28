import { PageHero } from '@/components/sections'
import { CtaSection } from '@/features/home/components'
import { OfficesSection } from '@/features/contact/components/OfficesSection/OfficesSection'

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
        sideStats={[
          { value: '24h',  label: 'Response Time' },
          { value: '3',    label: 'Global Offices' },
          { value: '1996', label: 'Established' },
        ]}
      />
      <CtaSection />
      <OfficesSection />
    </>
  )
}
