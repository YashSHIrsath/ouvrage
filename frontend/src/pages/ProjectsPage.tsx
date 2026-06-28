import { PageHero } from '@/components/sections'
import { ProjectsSection } from '@/features/home/components'

export function ProjectsPage() {
  return (
    <>
      <PageHero
        label="03 / Projects"
        headline="OUR"
        headlineSub="WORK"
        subtitle="A selection of landmark projects delivered across four continents — each one a testament to precision, ambition, and the BuildCo standard."
      />
      <ProjectsSection />
    </>
  )
}
