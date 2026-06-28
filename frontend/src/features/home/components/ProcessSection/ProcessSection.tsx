import { SiteContainer, SectionLabel } from '@/components/sections'
import { PROCESS_STEPS } from '../../data/process'
import blueprintImg from '@/assets/images/process-blueprint.jpg'
import styles from './ProcessSection.module.css'

export function ProcessSection() {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.header}>
          <div>
            <SectionLabel>03 / Process</SectionLabel>
            <h2 className={styles.headline}>
              HOW WE
              <br />
              DELIVER
            </h2>
          </div>
        </div>

        {/* Steps grid */}
        <div className={styles.steps}>
          <div className={styles.connector} aria-hidden />
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className={styles.step}>
              <div
                className={i === 0 ? `${styles.stepBox} ${styles.stepBoxActive}` : styles.stepBox}
              >
                <span className={i === 0 ? `${styles.stepNum} ${styles.stepNumActive}` : styles.stepNum}>
                  {step.num}
                </span>
              </div>
              <div className={styles.stepTime}>{step.time}</div>
              <h3 className={styles.stepPhase}>{step.phase}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Blueprint image */}
        <div className={styles.blueprintWrap}>
          <img
            src={blueprintImg}
            alt="Architectural blueprints and technical drawings"
            className={styles.blueprintImg}
          />
          <div className={styles.blueprintOverlay} />
          <div className={styles.blueprintContent}>
            <div className={styles.blueprintLabel}>Precision From Day One</div>
            <p className={styles.blueprintQuote}>
              Every project begins with a document — and ends with a landmark.
            </p>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
