import { FileText } from 'lucide-react'
import styles from './placeholder.module.css'

export function FormsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Forms</h1>
        <p className={styles.pageDesc}>View and manage contact form submissions.</p>
      </div>
      <div className={styles.placeholder}>
        <FileText size={40} className={styles.placeholderIcon} />
        <p className={styles.placeholderText}>Form submissions management coming in the next phase.</p>
      </div>
    </div>
  )
}
