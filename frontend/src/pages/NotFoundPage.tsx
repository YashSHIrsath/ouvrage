import { PageHero } from '@/components/sections'
import { CtaBanner } from '@/features/home/components'

export function NotFoundPage() {
  return (
    <>
      <title>Page Not Found — BuildCo</title>
      <meta name="description" content="The page you are looking for does not exist. Return to the BuildCo homepage or use the navigation above." />
      <PageHero
        label="Error / 404"
        headline="PAGE NOT"
        headlineSub="FOUND"
        subtitle="The page you are looking for does not exist or has been moved. Use the links below to get back on track."
      />
      <CtaBanner />
    </>
  )
}
