import { PageHero } from '@/components/sections'
import { TestimonialsSection } from '@/features/home/components'

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
      />
      <TestimonialsSection />
    </>
  )
}
