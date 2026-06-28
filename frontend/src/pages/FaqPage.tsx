import { PageHero } from '@/components/sections'
import { FaqSection } from '@/features/faq/components/FaqSection/FaqSection'
import { CtaBanner } from '@/features/home/components'

export function FaqPage() {
  return (
    <>
      <title>FAQ — BuildCo</title>
      <meta name="description" content="Answers to the most common questions about BuildCo's construction services, project process, coverage areas, and commercial capabilities." />
      <PageHero
        label="05 / FAQ"
        headline="COMMON"
        headlineSub="QUESTIONS"
        subtitle="Answers to the questions we hear most often from clients at the start of a new project relationship."
        sideAccent="FAQ"
      />
      <FaqSection />
      <CtaBanner
        label="06 / Contact"
        title="STILL HAVE"
        titleHighlight="QUESTIONS?"
        description="Our team is happy to answer anything we haven't covered here. Reach out and we'll respond within 24 hours."
        primaryLabel="Schedule a Consultation"
        primaryTo="/contact"
      />
    </>
  )
}
