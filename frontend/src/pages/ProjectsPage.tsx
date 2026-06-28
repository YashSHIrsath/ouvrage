import { PageHero } from '@/components/sections'
import { ProjectsSection } from '@/features/home/components'

export function ProjectsPage() {
  return (
    <>
      <title>Projects — BuildCo</title>
      <meta name="description" content="Browse BuildCo's portfolio of landmark construction and architecture projects delivered across four continents — commercial, residential, and mixed-use developments." />
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
