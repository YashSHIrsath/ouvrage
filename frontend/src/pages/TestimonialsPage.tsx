import { PageHero } from '@/components/sections'
import { TestimonialsSection } from '@/features/home/components'

export function TestimonialsPage() {
  return (
    <>
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
