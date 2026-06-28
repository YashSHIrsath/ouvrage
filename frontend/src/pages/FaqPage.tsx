import { PageHero } from '@/components/sections'
import { FaqSection } from '@/features/faq/components/FaqSection/FaqSection'

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
      />
      <FaqSection />
    </>
  )
}
