import { PageHero, StatsSection } from '@/components/sections'
import {
  AboutPreviewSection,
  TeamSection,
} from '@/features/home/components'
import { MissionValuesSection } from '@/features/about/components/MissionValuesSection/MissionValuesSection'
import { TimelineSection } from '@/features/about/components/TimelineSection/TimelineSection'
import { ABOUT_STATS } from '@/features/about/data/stats'

export function AboutPage() {
  return (
    <>
      <title>About Us — BuildCo</title>
      <meta name="description" content="Founded in 1996, BuildCo has grown from a regional construction firm into a globally respected integrated development group. Meet our team and our values." />
      <PageHero
        label="01 / About"
        headline="WHO"
        headlineSub="WE ARE"
        subtitle="Founded in 1996, BuildCo has grown from a regional construction firm into a globally respected integrated development group — spanning the Middle East, Europe, and Asia Pacific."
        sideStats={[
          { value: '28',   label: 'Years of Experience' },
          { value: '420+', label: 'Projects Delivered' },
          { value: '3',    label: 'Continents' },
        ]}
      />
      <AboutPreviewSection />
      <TimelineSection />
      <MissionValuesSection />
      <StatsSection stats={ABOUT_STATS} />
      <TeamSection />
    </>
  )
}
