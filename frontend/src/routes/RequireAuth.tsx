import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

/**
 * Wraps protected admin routes. Redirects to the login page while unauthenticated.
 * Renders nothing while the initial session check is still in flight.
 */
export function RequireAuth() {
  const { user, isInitializing } = useAuthStore()

  if (isInitializing) return null

  if (!user) return <Navigate to="/portal/login" replace />

  return <Outlet />
}
