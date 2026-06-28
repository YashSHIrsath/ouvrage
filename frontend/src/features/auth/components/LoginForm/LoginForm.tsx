import { useForm } from 'react-hook-form'
import { Checkbox } from 'antd'
import { TextInput } from '@/components/forms/TextInput/TextInput'
import { PasswordInput } from '@/components/forms/PasswordInput/PasswordInput'
import { Button } from '@/components/ui/Button/Button'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '@/stores/toastStore'
import type { LoginCredentials } from '../../types'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const { login } = useAuth()
  const toast = useToast()

  const { control, handleSubmit, register, formState: { isSubmitting } } = useForm<LoginCredentials>({
    defaultValues: { email: '', password: '', remember: false },
  })

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data)
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err))
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

      <div className={styles.fields}>
        <TextInput<LoginCredentials>
          name="email"
          control={control}
          label="Email address"
          placeholder="admin@buildco.com"
          required
          disabled={isSubmitting}
          size="large"
          rules={{
            required: 'Email address is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address.',
            },
          }}
        />

        <PasswordInput<LoginCredentials>
          name="password"
          control={control}
          label="Password"
          placeholder="••••••••"
          required
          disabled={isSubmitting}
          size="large"
          rules={{
            required: 'Password is required.',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters.',
            },
          }}
        />
      </div>

      <div className={styles.rememberRow}>
        <Checkbox {...register('remember')} disabled={isSubmitting}>
          Remember me
        </Checkbox>
      </div>

      <div className={styles.submitRow}>
        <Button
          htmlType="submit"
          variant="primary"
          size="lg"
          block
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </div>

    </form>
  )
}

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response
    if (res?.data?.errors) {
      const first = Object.values(res.data.errors)[0]
      if (Array.isArray(first) && first.length > 0) return first[0]
    }
    if (res?.data?.message) return res.data.message
  }
  return 'An unexpected error occurred. Please try again.'
}
