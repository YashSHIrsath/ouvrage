import apiClient from '@/services/apiClient'
import type { GeneralSettings, GeneralSettingsFormValues } from '../types'

function toFormData(values: GeneralSettingsFormValues): FormData {
  const fd = new FormData()
  fd.append('company_name', values.company_name ?? '')
  fd.append('tagline',      values.tagline      ?? '')
  fd.append('email',        values.email        ?? '')
  fd.append('phone',        values.phone        ?? '')
  fd.append('address',      values.address      ?? '')

  if (values.logo instanceof File) {
    fd.append('logo', values.logo)
  } else if (values.logo === null) {
    fd.append('remove_logo', '1')
  }

  if (values.favicon instanceof File) {
    fd.append('favicon', values.favicon)
  } else if (values.favicon === null) {
    fd.append('remove_favicon', '1')
  }

  return fd
}

export const settingsService = {
  async getGeneral(): Promise<GeneralSettings> {
    const { data } = await apiClient.get<{ data: GeneralSettings }>('/admin/settings/general')
    return data.data
  },

  async updateGeneral(values: GeneralSettingsFormValues): Promise<GeneralSettings> {
    const { data } = await apiClient.post<{ data: GeneralSettings }>(
      '/admin/settings/general',
      toFormData(values),
    )
    return data.data
  },
}
