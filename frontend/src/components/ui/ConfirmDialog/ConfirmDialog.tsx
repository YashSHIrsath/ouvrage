import { AlertTriangle, Trash2, Info } from 'lucide-react'
import { Modal } from '@/components/ui/Modal/Modal'
import { AdminButton } from '@/components/ui/AdminButton/AdminButton'
import styles from './ConfirmDialog.module.css'

type ConfirmVariant = 'danger' | 'warning' | 'default'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: ConfirmVariant
  loading?: boolean
}

const VARIANT_ICONS = {
  danger:  Trash2,
  warning: AlertTriangle,
  default: Info,
}

const VARIANT_COLORS = {
  danger:  '#ef4444',
  warning: '#f59e0b',
  default: 'var(--site-primary)',
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
}: ConfirmDialogProps) {
  const Icon = VARIANT_ICONS[variant]
  const color = VARIANT_COLORS[variant]

  return (
    <Modal open={open} onClose={onClose} size="sm" footer={null}>
      <div className={styles.dialog}>

        <div className={styles.iconWrap} style={{ '--icon-color': color } as React.CSSProperties}>
          <Icon size={22} />
        </div>

        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.actions}>
          <AdminButton variant="default" onClick={onClose} disabled={loading}>
            {cancelText}
          </AdminButton>
          <AdminButton
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </AdminButton>
        </div>

      </div>
    </Modal>
  )
}
