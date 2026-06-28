import { PageHero } from '@/components/sections'
import { FaqSection } from '@/features/faq/components/FaqSection/FaqSection'

export function FaqPage() {
  return (
    <>
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
