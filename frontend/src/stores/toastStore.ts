import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number // ms; 0 = manual dismiss only
}

interface ToastState {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
}

const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 3000,
  error:   5000,
  warning: 4500,
  info:    4000,
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  add: ({ type, message, duration }) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          type,
          message,
          duration: duration ?? DEFAULT_DURATION[type],
        },
      ],
    })),

  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

// Convenience hook — call toast.success(...), toast.error(...), etc.
export function useToast() {
  const add = useToastStore((s) => s.add)
  return {
    success: (message: string, duration?: number) => add({ type: 'success', message, duration: duration ?? 3000 }),
    error:   (message: string, duration?: number) => add({ type: 'error',   message, duration: duration ?? 5000 }),
    warning: (message: string, duration?: number) => add({ type: 'warning', message, duration: duration ?? 4500 }),
    info:    (message: string, duration?: number) => add({ type: 'info',    message, duration: duration ?? 4000 }),
  }
}
