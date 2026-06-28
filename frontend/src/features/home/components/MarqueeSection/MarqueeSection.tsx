import { CLIENTS } from '../../data/clients'
import styles from './MarqueeSection.module.css'

export function MarqueeSection() {
  const doubled = [...CLIENTS, ...CLIENTS]

  return (
    <div className={styles.track} aria-hidden>
      <div className={styles.inner}>
        {doubled.map((client, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.name}>{client}</span>
            <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
