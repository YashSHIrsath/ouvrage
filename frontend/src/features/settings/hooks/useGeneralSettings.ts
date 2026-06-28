import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/stores/toastStore'
import { settingsService } from '../api/settingsService'
import type { GeneralSettingsFormValues } from '../types'

function extractMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response
    if (res?.data?.message) return res.data.message
  }
  return 'An unexpected error occurred.'
}

const QUERY_KEY = ['settings', 'general'] as const

export function useGeneralSettings() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: settingsService.getGeneral,
    staleTime: 5 * 60 * 1000,
  })

  const mutation = useMutation({
    mutationFn: settingsService.updateGeneral,
    onSuccess: (fresh) => {
      queryClient.setQueryData(QUERY_KEY, fresh)
      toast.success('Settings saved successfully.')
    },
    onError: (err) => {
      toast.error(extractMessage(err))
    },
  })

  return {
    settings:  query.data ?? null,
    isLoading: query.isLoading,
    save:      (values: GeneralSettingsFormValues) => mutation.mutate(values),
    isSaving:  mutation.isPending,
  }
}
