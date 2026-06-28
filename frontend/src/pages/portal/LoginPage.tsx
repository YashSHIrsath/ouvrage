import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { user, isInitializing } = useAuthStore()
  const { mode, setMode } = useThemeStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isInitializing && user) {
      navigate('/admin', { replace: true })
    }
  }, [user, isInitializing, navigate])

  if (isInitializing) return null

  return (
    <div className={styles.page}>
      <main className={styles.card} role="main">

        {/* Brand row with theme toggle on the far right */}
        <div className={styles.brand}>
          <div className={styles.logoMark} aria-hidden="true">
            <div className={styles.logoBar} />
            <div className={styles.logoBarShort} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>BuildCo</span>
            <span className={styles.brandSub}>Administration</span>
          </div>
          <button
            className={styles.themeToggle}
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <div className={styles.divider} />

        {/* Heading */}
        <div className={styles.heading}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Restricted access · Authorised personnel only</p>
        </div>

        <LoginForm />

      </main>

      <p className={styles.footer}>
        © {new Date().getFullYear()} BuildCo Construction. All rights reserved.
      </p>
    </div>
  )
}
