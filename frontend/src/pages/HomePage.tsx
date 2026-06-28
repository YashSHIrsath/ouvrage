import {
  HeroSection,
  MarqueeSection,
  ServicesPreview,
  ProjectsPreview,
  TestimonialPreview,
  CtaBanner,
} from '@/features/home/components'

export function HomePage() {
  return (
    <>
      <title>BuildCo — Premium Construction & Architecture Group</title>
      <meta name="description" content="BuildCo delivers landmark construction, architecture and land development projects across Dubai, London and Sydney. 340+ projects completed since 1996." />
      <HeroSection />
      <MarqueeSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialPreview />
      <CtaBanner
        label="05 / Start Here"
        title="READY TO BUILD SOMETHING"
        titleHighlight="REMARKABLE?"
        description="Whether you have a detailed brief or just a vision — we want to hear about it. Our team responds within 24 hours."
        primaryLabel="Start a Project"
        primaryTo="/contact"
        secondaryLabel="View Our Work"
        secondaryTo="/projects"
      />
    </>
  )
}
