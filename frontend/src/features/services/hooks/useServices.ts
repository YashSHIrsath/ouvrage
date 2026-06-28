import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/stores/toastStore'
import { servicesApi } from '../api/servicesApi'
import type { ServiceFormValues } from '../types'

function extractMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response
    if (res?.data?.message) return res.data.message
  }
  return fallback
}

const QUERY_KEY = ['services'] as const

export function useServices() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: servicesApi.getServices,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateService() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: servicesApi.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service created successfully.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to save service.'))
    },
  })
}

export function useUpdateService() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, values }: { id: string | number; values: ServiceFormValues }) =>
      servicesApi.updateService(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service updated successfully.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to save service.'))
    },
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: servicesApi.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service deleted successfully.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to save service.')) // Wording aligns with "Unable to save service." for deletions if needed, or custom fallback
    },
  })
}

export function useReorderServices() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: servicesApi.reorderServices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Service order updated.')
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.error(extractMessage(err, 'Unable to reorder services.'))
    },
  })
}
