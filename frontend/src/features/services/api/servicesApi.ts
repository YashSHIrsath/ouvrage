import apiClient from '@/services/apiClient'
import type { Service, ServiceFormValues } from '../types'

// Map form values to FormData for uploads and text values
function toFormData(values: ServiceFormValues, method?: 'PUT'): FormData {
  const fd = new FormData()
  
  if (method === 'PUT') {
    fd.append('_method', 'PUT')
  }

  fd.append('title', values.title ?? '')
  fd.append('subtitle', values.subtitle ?? '')
  fd.append('short_description', values.short_description ?? '')
  fd.append('long_description', values.long_description ?? '')
  fd.append('icon', values.icon ?? '')
  fd.append('status', String(values.status))

  // Handle Cropped Image
  if (values.image instanceof File) {
    fd.append('image', values.image)
  } else if (values.image === null) {
    fd.append('remove_image', '1')
  }

  // Handle Original Image (if available from crop step)
  // We'll support binding a custom 'image_original' property to the form state
  const rawImage = (values as any).image_original
  if (rawImage instanceof File) {
    fd.append('image_original', rawImage)
  }

  return fd
}

export const servicesApi = {
  async getServices(): Promise<Service[]> {
    const { data } = await apiClient.get<{ data: Service[] }>('/admin/services')
    return data.data
  },

  async createService(values: ServiceFormValues): Promise<Service> {
    const { data } = await apiClient.post<{ data: Service }>('/admin/services', toFormData(values))
    return data.data
  },

  async updateService(id: string | number, values: ServiceFormValues): Promise<Service> {
    // RESTful PUT via POST spoofing for multipart/form-data support
    const { data } = await apiClient.post<{ data: Service }>(
      `/admin/services/${id}`,
      toFormData(values, 'PUT')
    )
    return data.data
  },

  async deleteService(id: string | number): Promise<void> {
    await apiClient.delete(`/admin/services/${id}`)
  },

  async reorderServices(updates: { id: string | number; sort_order: number }[]): Promise<void> {
    await apiClient.post('/admin/services/reorder', updates)
  },
}
