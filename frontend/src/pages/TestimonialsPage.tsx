import { PageHero } from '@/components/sections'
import { TestimonialsSection, CtaBanner } from '@/features/home/components'
import { ClientLogosStrip } from '@/features/testimonials/components/ClientLogosStrip/ClientLogosStrip'

export function TestimonialsPage() {
  return (
    <>
      <title>Client Testimonials — BuildCo</title>
      <meta name="description" content="Hear from the clients who trusted BuildCo with their most important construction and development projects. Real results, real words." />
      <PageHero
        label="04 / Testimonials"
        headline="CLIENT"
        headlineSub="VOICE"
        subtitle="The words of the clients who trusted us with their most important projects."
        sideStats={[
          { value: '98%',  label: 'Repeat Client Rate' },
          { value: '500+', label: 'Projects Delivered' },
          { value: '25',   label: 'Years of Trust' },
        ]}
      />
      <TestimonialsSection />
      <ClientLogosStrip />
      <CtaBanner
        label="05 / Work With Us"
        title="JOIN OUR LIST OF"
        titleHighlight="SATISFIED CLIENTS"
        description="Let's build something you'll be proud to put your name on."
        primaryLabel="Talk to Our Team"
        primaryTo="/contact"
        secondaryLabel="View Our Work"
        secondaryTo="/projects"
      />
    </>
  )
}
