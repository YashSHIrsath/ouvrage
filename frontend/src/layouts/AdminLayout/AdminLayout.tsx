import { Outlet } from 'react-router-dom'
import { cn } from '@/utils'
import { useSidebarStore } from '@/stores/sidebarStore'
import { Sidebar } from './Sidebar/Sidebar'
import { Topbar } from './Topbar/Topbar'
import styles from './AdminLayout.module.css'

export function AdminLayout() {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebarStore()

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

      {/* Main: topbar + scrollable content */}
      <div className={styles.main}>
        <Topbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
