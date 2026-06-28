import { createPortal } from 'react-dom'
import { useToastStore } from '@/stores/toastStore'
import { ToastItem } from './Toast'
import styles from './ToastContainer.module.css'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)

  return createPortal(
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  )
}
