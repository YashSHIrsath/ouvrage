import { NavLink } from 'react-router-dom'
import { cn } from '@/utils'
import styles from './NavItem.module.css'

interface NavItemProps {
  href: string
  label: string
  mobile?: boolean
  onClick?: () => void
}

export function NavItem({ href, label, mobile, onClick }: NavItemProps) {
  return (
    <NavLink
      to={href}
      end={href === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(styles.link, mobile && styles.mobile, isActive && styles.active)
      }
    >
      {label}
    </NavLink>
  )
}
