import { PageHero } from '@/components/sections'
import { ServicesSection } from '@/features/home/components'

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
    </>
  )
}
