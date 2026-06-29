import apiClient from '@/services/apiClient'
import type { Page, PageFormValues } from '../types'

export const pagesApi = {
  async getPageBySlug(slug: string): Promise<Page> {
    const { data } = await apiClient.get<{ data: Page }>(`/pages/${slug}`)
    return data.data
  },

  async getPages(): Promise<Page[]> {
    const { data } = await apiClient.get<{ data: Page[] }>('/admin/pages')
    return data.data
  },

  async createPage(values: Partial<PageFormValues>): Promise<Page> {
    const { data } = await apiClient.post<{ data: Page }>('/admin/pages', values)
    return data.data
  },

  async updatePage(id: number, values: Partial<PageFormValues>): Promise<Page> {
    const { data } = await apiClient.put<{ data: Page }>(`/admin/pages/${id}`, values)
    return data.data
  },

  async deletePage(id: number): Promise<void> {
    await apiClient.delete(`/admin/pages/${id}`)
  },

  async reorderPages(updates: { id: number; sort_order: number }[]): Promise<void> {
    await apiClient.post('/admin/pages/reorder', updates)
  },
}
