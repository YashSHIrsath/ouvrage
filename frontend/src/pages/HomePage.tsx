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
      <HeroSection />
      <MarqueeSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialPreview />
      <CtaBanner />
    </>
  )
}
