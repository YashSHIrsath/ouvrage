import { useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, LogOut } from 'lucide-react'
import { cn } from '@/utils'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import styles from './Topbar.module.css'

const ROUTE_TITLES: Record<string, string> = {
  '/admin':          'Dashboard',
  '/admin/website':  'Website',
  '/admin/website/services': 'Website / Services',
  '/admin/forms':    'Forms',
  '/admin/settings': 'Settings',
}

export function Topbar() {
  const { openMobile } = useSidebarStore()
  const { mode, setMode } = useThemeStore()
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()
  const { pathname } = useLocation()

  const pageTitle = ROUTE_TITLES[pathname] ?? 'Admin'

  return (
    <header className={styles.topbar}>

      {/* Mobile: hamburger */}
      <button
        className={cn(styles.iconBtn, styles.hamburger)}
        onClick={openMobile}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <span className={styles.pageTitle}>{pageTitle}</span>

      {/* Right slot */}
      <div className={styles.actions}>

        {user && (
          <span className={styles.userName} title={user.email}>
            {user.name}
          </span>
        )}

        <button
          className={styles.iconBtn}
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          className={cn(styles.logoutBtn)}
          onClick={logout}
          aria-label="Sign out"
        >
          <LogOut size={15} />
          <span className={styles.logoutLabel}>Sign out</span>
        </button>

      </div>
    </header>
  )
}
