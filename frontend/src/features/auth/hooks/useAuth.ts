import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '../api/authService'
import type { LoginCredentials } from '../types'

/**
 * Provides login, logout, and session initialisation.
 * Call `initAuth()` once at app root to restore session state.
 */
export function useAuth() {
  const { user, isInitializing, setUser, setInitializing, reset } = useAuthStore()
  const navigate = useNavigate()

  const initAuth = useCallback(async () => {
    try {
      const me = await authService.me()
      setUser(me)
    } catch {
      reset()
    } finally {
      setInitializing(false)
    }
  }, [setUser, reset, setInitializing])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const me = await authService.login(credentials)
      setUser(me)
      navigate('/admin', { replace: true })
    },
    [setUser, navigate],
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      reset()
      navigate('/portal/login', { replace: true })
    }
  }, [reset, navigate])

  return {
    user,
    isInitializing,
    isAuthenticated: user !== null,
    initAuth,
    login,
    logout,
  }
}
