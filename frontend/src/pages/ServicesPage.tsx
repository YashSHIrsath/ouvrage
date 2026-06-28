import { PageHero } from '@/components/sections'
import { ServicesSection } from '@/features/home/components'

export function ServicesPage() {
  return (
    <>
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
