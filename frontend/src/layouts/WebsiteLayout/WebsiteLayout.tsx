import { Outlet } from 'react-router-dom'
import styles from './WebsiteLayout.module.css'

export function WebsiteLayout() {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  )
}
