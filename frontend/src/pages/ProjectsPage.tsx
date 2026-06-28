import { useState } from 'react'
import { PageHero } from '@/components/sections'
import { ProjectsSection, ProjectFilter, CtaBanner } from '@/features/home/components'

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

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
      <ProjectFilter active={activeCategory} onChange={setActiveCategory} />
      <ProjectsSection />
      <CtaBanner
        label="04 / Let's Talk"
        title="READY TO DISCUSS"
        titleHighlight="YOUR PROJECT?"
        description="Share your vision with us. Our team will get back to you within 24 hours."
        primaryLabel="Discuss Your Project"
        primaryTo="/contact"
      />
    </>
  )
}
