import { useQuery } from '@tanstack/react-query'
import { publicServicesApi } from '../api/publicServicesApi'

export const PUBLIC_SERVICES_QUERY_KEY = ['public', 'services'] as const

export function usePublicServices() {
  return useQuery({
    queryKey: PUBLIC_SERVICES_QUERY_KEY,
    queryFn: publicServicesApi.getPublicServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,    // 10 minutes
  })
}
