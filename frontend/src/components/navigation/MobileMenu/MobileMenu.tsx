import { Drawer } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '../navLinks'
import { NavItem } from '../NavItem/NavItem'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const navigate = useNavigate()

  const handleCta = () => {
    navigate('/contact?enquiry=quote')
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={300}
      classNames={{
        body: styles.body,
        content: styles.drawerContent,
        header: styles.drawerHeader,
      }}
      title={
        <Link to="/" onClick={onClose} className={styles.logo}>
          <div className={styles.logoMark}>
            <div className={styles.logoBar} />
            <div className={styles.logoBarShort} />
          </div>
          <span className={styles.logoText}>BuildCo</span>
        </Link>
      }
    >
      <nav className={styles.nav} aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            label={link.label}
            mobile
            onClick={onClose}
          />
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.ctaBtn} onClick={handleCta}>
          Get a Quote <ArrowUpRight size={13} />
        </button>
      </div>
    </Drawer>
  )
}
