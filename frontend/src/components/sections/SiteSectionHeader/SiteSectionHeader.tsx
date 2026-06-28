import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './SiteSectionHeader.module.css'

interface SiteSectionHeaderProps {
  label: string
  title: string
  titleHighlight?: string
  description?: string
  className?: string
}

export function SiteSectionHeader({
  label,
  title,
  titleHighlight,
  description,
  className,
}: SiteSectionHeaderProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  const cls = [
    styles.header,
    visible ? styles.revealed : styles.hidden,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cls}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className={styles.title}>
        {title}
        {titleHighlight && (
          <>
            <br />
            <span className={styles.titleHighlight}>{titleHighlight}</span>
          </>
        )}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
