import { Modal as AntModal } from 'antd'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode | null
  size?: ModalSize
  closable?: boolean
}

const SIZE_WIDTH: Record<ModalSize, number> = {
  sm: 400,
  md: 560,
  lg: 720,
  xl: 900,
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer = null,
  size = 'md',
  closable = true,
}: ModalProps) {
  return (
    <AntModal
      open={open}
      onCancel={onClose}
      width={SIZE_WIDTH[size]}
      footer={footer}
      closable={false}        // use our own close button
      destroyOnHidden
      centered
      styles={{ mask: { backdropFilter: 'blur(2px)' } }}
      className={styles.modal}
    >
      {/* Custom header */}
      {(title || closable) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {closable && (
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
          )}
        </div>
      )}

      <div className={styles.body}>{children}</div>
    </AntModal>
  )
}
