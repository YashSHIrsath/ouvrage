import { useQuery } from '@tanstack/react-query'
import { navApi } from '../api/navApi'
import type { NavItem } from '../types'

export const PUBLIC_NAVIGATION_QUERY_KEY = ['navigation'] as const

/**
 * Hardcoded fallback — mirrors the NavItemSeeder exactly.
 * Used as initialData so the public nav renders immediately on first load
 * before the API response arrives. Replaced silently once the API responds.
 */
const NAV_FALLBACK: NavItem[] = [
  { id: 1, page_id: null, label: 'Home',         href: '/',             type: 'page', is_navbar: true,  is_footer: true,  sort_order: 1, status: 1 },
  { id: 2, page_id: null, label: 'About',        href: '/about',        type: 'page', is_navbar: true,  is_footer: true,  sort_order: 2, status: 1 },
  { id: 3, page_id: null, label: 'Services',     href: '/services',     type: 'page', is_navbar: true,  is_footer: true,  sort_order: 3, status: 1 },
  { id: 4, page_id: null, label: 'Projects',     href: '/projects',     type: 'page', is_navbar: true,  is_footer: true,  sort_order: 4, status: 1 },
  { id: 5, page_id: null, label: 'Testimonials', href: '/testimonials', type: 'page', is_navbar: true,  is_footer: false, sort_order: 5, status: 1 },
  { id: 6, page_id: null, label: 'FAQ',          href: '/faq',          type: 'page', is_navbar: true,  is_footer: true,  sort_order: 6, status: 1 },
  { id: 7, page_id: null, label: 'Contact',      href: '/contact',      type: 'page', is_navbar: true,  is_footer: true,  sort_order: 7, status: 1 },
]

/**
 * Public navigation hook — replaces the static navLinks.ts import.
 * Computes page labels (e.g. "02 / SERVICES") from nav order so PageHero
 * updates automatically when the admin reorders items.
 */
export function useNavigation() {
  const { data = NAV_FALLBACK } = useQuery({
    queryKey: PUBLIC_NAVIGATION_QUERY_KEY,
    queryFn: navApi.getNavigation,
    staleTime: 10 * 60 * 1000,
    initialData: NAV_FALLBACK,
    initialDataUpdatedAt: 0, // treat as stale so the API is always fetched in background
  })

  const navbarItems = data.filter(n => n.is_navbar)
  const footerItems = data.filter(n => n.is_footer)

  /**
   * Returns the auto-computed page label based on the item's position in the
   * active navbar list — e.g. "/services" at position 3 → "03 / SERVICES".
   * Returns '' if the href is not found in the navbar.
   */
  function getPageLabel(href: string): string {
    const index = navbarItems.findIndex(n => n.href === href)
    if (index < 0) return ''
    const num = String(index + 1).padStart(2, '0')
    return `${num} / ${navbarItems[index].label.toUpperCase()}`
  }

  return { navbarItems, footerItems, getPageLabel }
}
