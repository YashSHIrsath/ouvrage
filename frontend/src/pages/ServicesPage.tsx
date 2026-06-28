import { PageHero } from '@/components/sections'
import { ServicesSection, ProcessSection, CtaBanner } from '@/features/home/components'

export function ServicesPage() {
  return (
    <>
      <title>Services — BuildCo</title>
      <meta name="description" content="Five integrated disciplines under one roof: building construction, land development, architecture, project management, and engineering consultation." />
      <PageHero
        label="02 / Services"
        headline="WHAT"
        headlineSub="WE DO"
        subtitle="Five integrated disciplines, one accountable team. From concept to completion — architecture, engineering, construction, management, and consultation under one roof."
      />
      <ServicesSection />
      <ProcessSection />
      <CtaBanner
        label="03 / Start a Project"
        title="READY TO BUILD"
        titleHighlight="SOMETHING GREAT?"
        description="Tell us about your project. Our integrated team will respond within 24 hours with a clear path forward."
        primaryLabel="Request a Proposal"
        primaryTo="/contact"
        secondaryLabel="View Our Projects"
        secondaryTo="/projects"
      />
    </>
  )
}
