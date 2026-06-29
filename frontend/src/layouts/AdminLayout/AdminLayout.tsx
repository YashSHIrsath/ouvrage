import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/utils'
import { useSidebarStore } from '@/stores/sidebarStore'
import { Sidebar } from './Sidebar/Sidebar'
import { Topbar } from './Topbar/Topbar'
import { WebsiteCmsNav } from './WebsiteCmsNav/WebsiteCmsNav'
import styles from './AdminLayout.module.css'

export function AdminLayout() {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebarStore()
  const { pathname } = useLocation()

  const showCmsNav = pathname.startsWith('/admin/website')

  return (
    <div
      className={cn(
        styles.layout,
        isCollapsed  && styles.collapsed,
        isMobileOpen && styles.mobileOpen,
      )}
    >
      <Sidebar />

      {/* Mobile overlay — blocks content behind the open drawer */}
      <div
        className={styles.overlay}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Main: topbar → [optional website nav] → scrollable content */}
      <div className={styles.main}>
        <Topbar />
        {showCmsNav && <WebsiteCmsNav />}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
