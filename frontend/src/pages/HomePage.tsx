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
      <CtaBanner />
    </>
  )
}
