import { useState, useEffect } from 'react'
import { useBlocker } from 'react-router-dom'
import { useAdminPages, useUpdatePage } from '@/features/pages/hooks/useAdminPages'
import { useNavItems, useCreateNavItem } from '@/features/navigation/hooks/useNavItems'
import { PageForm } from './pages/PageForm'
import type { PageFormValues, NavLinkOptions } from '@/features/pages/types'
import styles from './PageSettingsPage.module.css'

interface PageSettingsPageProps {
  slug: string
}

export function PageSettingsPage({ slug }: PageSettingsPageProps) {
  const { data: pages = [], isLoading } = useAdminPages()
  const { data: navItems = [] }         = useNavItems()
  const updateMutation                  = useUpdatePage()
  const createNavMutation               = useCreateNavItem()

  const [isFormDirty, setIsFormDirty] = useState(false)

  const page            = pages.find(p => p.slug === slug) ?? null
  const navAlreadyLinked = navItems.some(n => n.page_id === page?.id)

  const isSaving = updateMutation.isPending || createNavMutation.isPending

  // Navigation guard — prompt when leaving with unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isFormDirty && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm('You have unsaved changes. Discard them and leave?')
      if (proceed) blocker.proceed()
      else         blocker.reset()
    }
  }, [blocker.state])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isFormDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isFormDirty])

  // Reset dirty state when slug changes (tab switch)
  useEffect(() => { setIsFormDirty(false) }, [slug])

  const handleSubmit = (values: PageFormValues, navLink?: NavLinkOptions) => {
    if (!page) return
    updateMutation.mutate(
      { id: page.id, values },
      {
        onSuccess: () => {
          setIsFormDirty(false)
          if (navLink) {
            createNavMutation.mutate({
              label:     navLink.label || values.nav_label || values.title,
              href:      `/${values.slug}`,
              type:      'page',
              page_id:   page.id,
              is_navbar: navLink.is_navbar,
              is_footer: navLink.is_footer,
              status:    1,
            })
          }
        },
      }
    )
  }

  if (isLoading) return <div className={styles.loading}>Loading…</div>

  if (!page) {
    return (
      <div className={styles.notFound}>
        <span>Page not found in database.</span>
        <span>Run the seeder to create the <strong>{slug}</strong> page.</span>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageForm
        key={page.id}
        initialValues={page}
        onSubmit={handleSubmit}
        onDiscard={() => setIsFormDirty(false)}
        isSaving={isSaving}
        onDirtyChange={setIsFormDirty}
        navAlreadyLinked={navAlreadyLinked}
      />
    </div>
  )
}
