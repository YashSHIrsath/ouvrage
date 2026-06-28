import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Globe,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/utils'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { path: '/admin',          label: 'Dashboard', icon: LayoutDashboard, end: true  },
  { path: '/admin/website',  label: 'Website',   icon: Globe,            end: false },
  { path: '/admin/forms',    label: 'Forms',     icon: FileText,         end: false },
  { path: '/admin/settings', label: 'Settings',  icon: Settings,         end: false },
] as const

export function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapsed, closeMobile } = useSidebarStore()
  const { logout } = useAuth()

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
        {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={closeMobile}
            className={({ isActive }) =>
              cn(styles.navItem, isActive && styles.active)
            }
          >
            <Icon size={17} className={styles.navIcon} aria-hidden="true" />
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Footer: Logout ──────────────────────────────── */}
      <div className={styles.footer}>
        <div className={styles.divider} />
        <button
          className={cn(styles.navItem, styles.logoutBtn)}
          onClick={logout}
        >
          <LogOut size={17} className={styles.navIcon} aria-hidden="true" />
          <span className={styles.navLabel}>Logout</span>
        </button>
      </div>

    </aside>
  )
}
