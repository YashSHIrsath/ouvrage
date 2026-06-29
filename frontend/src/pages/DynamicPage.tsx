import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SiteContainer, PageHero } from '@/components/sections'
import { NotFoundPage } from './NotFoundPage'
import { pagesApi } from '@/features/pages/api/pagesApi'
import styles from './DynamicPage.module.css'

export function DynamicPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  const { data: page, isLoading, isError, error } = useQuery({
    queryKey: ['public-page', slug],
    queryFn: () => pagesApi.getPageBySlug(slug),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) return null

  const is404 = isError && (error as { response?: { status?: number } })?.response?.status === 404
  if (is404) return <NotFoundPage />

  return (
    <>
      <PageHero headline={page?.title ?? ''} />
      <SiteContainer>
        <p className={styles.placeholder}>This page is coming soon.</p>
      </SiteContainer>
    </>
  )
}
