import { Outlet } from 'react-router-dom'
import { Header } from '@/components/navigation'
import { Footer } from '@/components/navigation'
import styles from './PublicLayout.module.css'

export function PublicLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
