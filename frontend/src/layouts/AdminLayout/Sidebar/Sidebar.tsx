import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Globe,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/utils'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import styles from './Sidebar.module.css'

const TOP_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
] as const

const BOTTOM_ITEMS = [
  { path: '/admin/forms',    label: 'Forms',    icon: FileText, end: false },
  { path: '/admin/settings', label: 'Settings', icon: Settings,  end: false },
] as const

const WEBSITE_PAGES = [
  { path: '/admin/website/home',         label: 'Home'         },
  { path: '/admin/website/about',        label: 'About'        },
  { path: '/admin/website/services',     label: 'Services'     },
  { path: '/admin/website/projects',     label: 'Projects'     },
  { path: '/admin/website/testimonials', label: 'Testimonials' },
  { path: '/admin/website/faq',          label: 'FAQ'          },
  { path: '/admin/website/contact',      label: 'Contact'      },
] as const

const WEBSITE_TOOLS = [
  { path: '/admin/website/navigation', label: 'Navigation' },
  { path: '/admin/website/pages',      label: 'Pages'      },
] as const

export function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapsed, closeMobile } = useSidebarStore()
  const { logout } = useAuth()
  const { pathname } = useLocation()

  const [websiteOpen, setWebsiteOpen] = useState(() => {
    return localStorage.getItem('admin-website-nav') !== 'false'
  })

  const isWebsiteActive = pathname.startsWith('/admin/website')

  const toggleWebsite = () => {
    const next = !websiteOpen
    setWebsiteOpen(next)
    localStorage.setItem('admin-website-nav', String(next))
  }

  return (
    <aside
      className={cn(styles.sidebar, isCollapsed && styles.collapsed)}
      data-mobile-open={isMobileOpen || undefined}
    >

      {/* ── Header ─────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoMark} aria-hidden="true">
            <div className={styles.logoBar} />
            <div className={styles.logoBarShort} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>BuildCo</span>
            <span className={styles.brandSub}>Admin</span>
          </div>
        </div>
        <button
          className={styles.collapseBtn}
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      <div className={styles.divider} />

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className={styles.nav} aria-label="Admin navigation">

        {/* Dashboard */}
        {TOP_ITEMS.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={closeMobile}
            className={({ isActive }) => cn(styles.navItem, isActive && styles.active)}
          >
            <Icon size={17} className={styles.navIcon} aria-hidden="true" />
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}

        {/* ── Website collapsible group ─────────────────── */}
        <div className={cn(styles.group, isWebsiteActive && styles.groupActive)}>
          {/* Group header */}
          <button
            type="button"
            onClick={toggleWebsite}
            className={cn(styles.navItem, styles.groupHeader, isWebsiteActive && styles.active)}
            aria-expanded={websiteOpen}
          >
            <Globe size={17} className={styles.navIcon} aria-hidden="true" />
            <span className={styles.navLabel}>Website</span>
            {!isCollapsed && (
              <ChevronDown
                size={14}
                className={cn(styles.groupChevron, websiteOpen && styles.groupChevronOpen)}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Child items — only visible when expanded and sidebar is not collapsed */}
          {websiteOpen && !isCollapsed && (
            <div className={styles.children}>
              {WEBSITE_PAGES.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  onClick={closeMobile}
                  className={({ isActive }) => cn(styles.childItem, isActive && styles.childActive)}
                >
                  {label}
                </NavLink>
              ))}

              <div className={styles.childDivider} />

              {WEBSITE_TOOLS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  onClick={closeMobile}
                  className={({ isActive }) => cn(styles.childItem, isActive && styles.childActive)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Forms, Settings */}
        {BOTTOM_ITEMS.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={closeMobile}
            className={({ isActive }) => cn(styles.navItem, isActive && styles.active)}
          >
            <Icon size={17} className={styles.navIcon} aria-hidden="true" />
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}

      </nav>

      {/* ── Footer: Logout ──────────────────────────────── */}
      <div className={styles.footer}>
        <div className={styles.divider} />
        <button className={cn(styles.navItem, styles.logoutBtn)} onClick={logout}>
          <LogOut size={17} className={styles.navIcon} aria-hidden="true" />
          <span className={styles.navLabel}>Logout</span>
        </button>
      </div>

    </aside>
  )
}
