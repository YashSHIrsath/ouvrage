import { LayoutDashboard } from 'lucide-react'
import styles from './placeholder.module.css'

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageDesc}>Website overview and recent activity.</p>
      </div>
      <div className={styles.placeholder}>
        <LayoutDashboard size={40} className={styles.placeholderIcon} />
        <p className={styles.placeholderText}>Dashboard widgets coming in the next phase.</p>
      </div>
    </div>
  )
}
