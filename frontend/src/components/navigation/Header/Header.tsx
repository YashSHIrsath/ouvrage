import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, ArrowUpRight } from 'lucide-react'
import { SiteContainer } from '@/components/sections'
import { cn } from '@/utils'
import { NAV_LINKS } from '../navLinks'
import { NavItem } from '../NavItem/NavItem'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import styles from './Header.module.css'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={cn(styles.header, scrolled && styles.scrolled)}>
        <SiteContainer className={styles.headerShell}>
          <div className={styles.inner}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoMark}>
                <div className={styles.logoBar} />
                <div className={styles.logoBarShort} />
              </div>
              <span className={styles.logoText}>BuildCo</span>
            </Link>

            <nav className={styles.nav} aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>

            <div className={styles.actions}>
              <button
                className={`${styles.iconBtn} ${styles.menuBtn}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>

              <button
                className={styles.ctaBtn}
                onClick={() => navigate('/contact')}
              >
                Get a Quote <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </SiteContainer>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
