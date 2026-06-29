import { useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './WebsiteCmsNav.module.css'

const PAGE_TABS = [
  { path: '/admin/website/home',         label: 'Home'         },
  { path: '/admin/website/about',        label: 'About'        },
  { path: '/admin/website/services',     label: 'Services'     },
  { path: '/admin/website/projects',     label: 'Projects'     },
  { path: '/admin/website/testimonials', label: 'Testimonials' },
  { path: '/admin/website/faq',          label: 'FAQ'          },
  { path: '/admin/website/contact',      label: 'Contact'      },
] as const

const TOOL_TABS = [
  { path: '/admin/website/navigation', label: 'Navigation' },
  { path: '/admin/website/pages',      label: 'Pages'      },
] as const

const ALL_TABS = [...PAGE_TABS, ...TOOL_TABS]

export function WebsiteCmsNav() {
  const { pathname } = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRef      = useRef<HTMLSpanElement>(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    const pill      = pillRef.current
    if (!container || !pill) return

    // Find which tab is active (exact match or starts-with for nested routes)
    const activeTab = container.querySelector<HTMLElement>('[data-active="true"]')

    if (!activeTab) {
      pill.style.opacity = '0'
      return
    }

    const cRect = container.getBoundingClientRect()
    const tRect = activeTab.getBoundingClientRect()
    const newLeft  = tRect.left - cRect.left
    const newWidth = tRect.width

    if (isFirstMount.current) {
      // On first paint: snap to position with no animation, then enable transitions
      pill.style.setProperty('transition', 'none', 'important')
      pill.style.left    = `${newLeft}px`
      pill.style.width   = `${newWidth}px`
      pill.style.opacity = '1'
      // Re-enable the spring transition on the next two animation frames
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (pill) pill.style.removeProperty('transition')
      }))
      isFirstMount.current = false
    } else {
      // Subsequent navigations: spring animation runs via CSS
      pill.style.opacity = '1'
      pill.style.left    = `${newLeft}px`
      pill.style.width   = `${newWidth}px`
    }
  }, [pathname])

  // Determine the active path (exact or prefix match, longest wins)
  function isActive(path: string): boolean {
    if (pathname === path) return true
    // Avoid /admin/website/faq matching /admin/website/faq-archive etc.
    return pathname.startsWith(path + '/')
  }

  return (
    <nav className={styles.nav} aria-label="Website sections">
      <div className={styles.tabsWrapper} ref={containerRef}>
        {/* Spring pill lives behind all tabs */}
        <span ref={pillRef} className={styles.pill} aria-hidden="true" />

        {PAGE_TABS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end
            data-active={isActive(path) || undefined}
            className={styles.tab}
          >
            {label}
          </NavLink>
        ))}

        <span className={styles.separator} aria-hidden="true" />

        {TOOL_TABS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end
            data-active={isActive(path) || undefined}
            className={styles.tab}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

// Export tab paths for Topbar and router convenience
export { ALL_TABS, PAGE_TABS, TOOL_TABS }
