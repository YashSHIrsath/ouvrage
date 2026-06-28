import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

/**
 * Root-level layout route. Checks the active Laravel session once on mount
 * so auth state is available to both public and admin routes.
 */
export function AuthInit() {
  const { initAuth } = useAuth()

  useEffect(() => {
    void initAuth()
  }, [initAuth])

  return <Outlet />
}
