import { create } from 'zustand'
import type { AdminUser } from '@/features/auth/types'

interface AuthState {
  user: AdminUser | null
  // true while the initial /me check is in flight — prevents flash of login page
  isInitializing: boolean
  setUser: (user: AdminUser | null) => void
  setInitializing: (value: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isInitializing: true,
  setUser: (user) => set({ user }),
  setInitializing: (isInitializing) => set({ isInitializing }),
  reset: () => set({ user: null, isInitializing: false }),
}))
