import axios from 'axios'
import apiClient from '@/services/apiClient'
import type { AdminUser, LoginCredentials } from '../types'

// Relative URL — proxied through Vite to Laravel (localhost:8000/sanctum/csrf-cookie).
// Cookie is set for localhost:5173, so axios can read XSRF-TOKEN from document.cookie.
async function fetchCsrfCookie(): Promise<void> {
  await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AdminUser> {
    await fetchCsrfCookie()
    const { data } = await apiClient.post<{ data: AdminUser }>('/auth/login', credentials)
    return data.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async me(): Promise<AdminUser> {
    const { data } = await apiClient.get<{ data: AdminUser }>('/auth/me')
    return data.data
  },
}
