import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useToastStore, type Toast } from '@/stores/toastStore'
import { cn } from '@/utils'
import styles from './Toast.module.css'

const ICONS = {
  success: CheckCircle2,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
}

interface ToastItemProps {
  toast: Toast
}

export function ToastItem({ toast }: ToastItemProps) {
  const remove = useToastStore((s) => s.remove)
  const [isLeaving, setIsLeaving] = useState(false)

  const dismiss = useCallback(() => setIsLeaving(true), [])

  const handleAnimationEnd = useCallback(() => {
    if (isLeaving) remove(toast.id)
  }, [isLeaving, remove, toast.id])

  useEffect(() => {
    if (toast.duration === 0) return
    const timer = setTimeout(dismiss, toast.duration)
    return () => clearTimeout(timer)
  }, [toast.duration, dismiss])

  const Icon = ICONS[toast.type]

  return (
    <div
      className={cn(styles.toast, styles[toast.type], isLeaving && styles.leaving)}
      role="alert"
      aria-live="assertive"
      onAnimationEnd={handleAnimationEnd}
    >
      <Icon size={16} className={styles.icon} aria-hidden="true" />
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <X size={13} />
      </button>
    </div>
  )
}
