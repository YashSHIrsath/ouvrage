import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/stores/toastStore'
import { navApi } from '../api/navApi'
import { PUBLIC_NAVIGATION_QUERY_KEY } from './useNavigation'
import type { NavItemFormValues } from '../types'

function extractMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response
    if (res?.data?.message) return res.data.message
  }
  return fallback
}

const ADMIN_QUERY_KEY = ['nav-items'] as const

export function useNavItems() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEY,
    queryFn: navApi.getNavItems,
    staleTime: 5 * 60 * 1000,
  })
}

function useInvalidate() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY })
    queryClient.invalidateQueries({ queryKey: PUBLIC_NAVIGATION_QUERY_KEY })
  }
}

export function useCreateNavItem() {
  const invalidate = useInvalidate()
  const toast = useToast()

  return useMutation({
    mutationFn: (values: NavItemFormValues) => navApi.createNavItem(values),
    onSuccess: () => {
      invalidate()
      toast.success('Navigation item created.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to create navigation item.'))
    },
  })
}

export function useUpdateNavItem() {
  const invalidate = useInvalidate()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: NavItemFormValues }) =>
      navApi.updateNavItem(id, values),
    onSuccess: () => {
      invalidate()
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to update navigation item.'))
    },
  })
}

export function useDeleteNavItem() {
  const invalidate = useInvalidate()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => navApi.deleteNavItem(id),
    onSuccess: () => {
      invalidate()
      toast.success('Navigation item deleted.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to delete navigation item.'))
    },
  })
}

export function useReorderNavItems() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (updates: { id: number; sort_order: number }[]) =>
      navApi.reorderNavItems(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: PUBLIC_NAVIGATION_QUERY_KEY })
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: PUBLIC_NAVIGATION_QUERY_KEY })
      toast.error(extractMessage(err, 'Unable to reorder navigation.'))
    },
  })
}
