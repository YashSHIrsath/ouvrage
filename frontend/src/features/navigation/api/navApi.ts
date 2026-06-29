import apiClient from '@/services/apiClient'
import type { NavItem, NavItemFormValues } from '../types'

export const navApi = {
  // ── Public ─────────────────────────────────────────────────────────────────
  async getNavigation(): Promise<NavItem[]> {
    const { data } = await apiClient.get<{ data: NavItem[] }>('/navigation')
    return data.data
  },

  // ── Admin ───────────────────────────────────────────────────────────────────
  async getNavItems(): Promise<NavItem[]> {
    const { data } = await apiClient.get<{ data: NavItem[] }>('/admin/nav-items')
    return data.data
  },

  async createNavItem(values: NavItemFormValues): Promise<NavItem> {
    const { data } = await apiClient.post<{ data: NavItem }>('/admin/nav-items', values)
    return data.data
  },

  async updateNavItem(id: number, values: NavItemFormValues): Promise<NavItem> {
    const { data } = await apiClient.put<{ data: NavItem }>(`/admin/nav-items/${id}`, values)
    return data.data
  },

  async deleteNavItem(id: number): Promise<void> {
    await apiClient.delete(`/admin/nav-items/${id}`)
  },

  async reorderNavItems(updates: { id: number; sort_order: number }[]): Promise<void> {
    await apiClient.post('/admin/nav-items/reorder', updates)
  },
}
