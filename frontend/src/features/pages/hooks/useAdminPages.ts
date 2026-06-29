import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/stores/toastStore'
import { pagesApi } from '../api/pagesApi'
import type { PageFormValues } from '../types'

function extractMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response
    if (res?.data?.message) return res.data.message
  }
  return fallback
}

const QUERY_KEY = ['admin-pages'] as const

export function useAdminPages() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: pagesApi.getPages,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreatePage() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (values: Partial<PageFormValues>) => pagesApi.createPage(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Page created successfully.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to create page.'))
    },
  })
}

export function useUpdatePage() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<PageFormValues> }) =>
      pagesApi.updatePage(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Page saved.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to save page.'))
    },
  })
}

export function useDeletePage() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => pagesApi.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success('Page deleted.')
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Unable to delete page.'))
    },
  })
}

export function useReorderPages() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (updates: { id: number; sort_order: number }[]) =>
      pagesApi.reorderPages(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.error(extractMessage(err, 'Unable to reorder pages.'))
    },
  })
}
