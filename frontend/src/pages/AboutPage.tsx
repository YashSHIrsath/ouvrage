import { PageHero } from '@/components/sections'
import {
  AboutPreviewSection,
  TeamSection,
} from '@/features/home/components'
import { MissionValuesSection } from '@/features/about/components/MissionValuesSection/MissionValuesSection'

export function AboutPage() {
  return (
    <>
      <PageHero
        label="01 / About"
        headline="WHO"
        headlineSub="WE ARE"
        subtitle="Founded in 1996, BuildCo has grown from a regional construction firm into a globally respected integrated development group — spanning the Middle East, Europe, and Asia Pacific."
      />
      <AboutPreviewSection />
      <MissionValuesSection />
      <TeamSection />
    </>
  )
}
