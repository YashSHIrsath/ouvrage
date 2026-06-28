import { Link } from 'react-router-dom'
import { Globe, Camera, Briefcase, Share2, MapPin, Phone, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SiteContainer } from '@/components/sections'
import { NAV_LINKS } from '../navLinks'
import styles from './Footer.module.css'

interface SocialLink {
  icon: LucideIcon
  label: string
  href: string
}

interface ContactItem {
  icon: LucideIcon
  text: string
}

// Social icons are placeholders — replace with brand-specific icons in production
const SOCIAL_LINKS: SocialLink[] = [
  { icon: Globe,    label: 'Facebook',    href: '#' },
  { icon: Camera,   label: 'Instagram',   href: '#' },
  { icon: Briefcase, label: 'LinkedIn',   href: '#' },
  { icon: Share2,   label: 'Twitter / X', href: '#' },
]

const SERVICE_LINKS = [
  'General Construction',
  'Renovation & Remodeling',
  'Project Management',
  'Design Consultation',
]

const CONTACT_INFO: ContactItem[] = [
  { icon: MapPin, text: '123 Builder Street, City, State 00000' },
  { icon: Phone,  text: '+1 (555) 000-0000' },
  { icon: Mail,   text: 'info@buildco.com' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <SiteContainer>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoMark}>
                <div className={styles.logoBar} />
                <div className={styles.logoBarShort} />
              </div>
              <span className={styles.logoText}>BuildCo</span>
            </Link>

            <p className={styles.description}>
              Engineering excellence and architectural vision — delivering landmark
              projects and trusted construction solutions since 1996.
            </p>

            <div className={styles.socials}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className={styles.socialLink}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              {SERVICE_LINKS.map((name) => (
                <li key={name}>
                  <Link to="/services" className={styles.link}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.contactList}>
              {CONTACT_INFO.map(({ icon: Icon, text }) => (
                <li key={text} className={styles.contactItem}>
                  <Icon size={14} className={styles.contactIcon} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} role="separator" />

        <div className={styles.bottom}>
          <span className={styles.copyright}>© {year} BuildCo. All rights reserved.</span>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <span className={styles.legalLink}>ISO 9001:2015 Certified</span>
          </div>
        </div>
      </SiteContainer>
    </footer>
  )
}
