import apiClient from '@/services/apiClient'
import type { Service } from '../types'

export const publicServicesApi = {
  /**
   * Fetch active services for the public website (no auth required)
   */
  async getPublicServices(): Promise<Service[]> {
    const { data } = await apiClient.get<{ data: Service[] }>('/services')
    return data.data
  },
}
