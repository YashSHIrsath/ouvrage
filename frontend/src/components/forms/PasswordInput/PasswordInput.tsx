import { Input } from 'antd'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Label } from '@/components/typography'
import { cn } from '@/utils'
import styles from './PasswordInput.module.css'

interface PasswordInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  hint?: string
  size?: 'small' | 'middle' | 'large'
  className?: string
  rules?: RegisterOptions<T>
}

export function PasswordInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  hint,
  size = 'middle',
  className,
  rules,
}: PasswordInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={cn(styles.field, className)}>
          {label && (
            <Label htmlFor={String(name)} required={required}>
              {label}
            </Label>
          )}
          <Input.Password
            {...field}
            id={String(name)}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            status={fieldState.error ? 'error' : undefined}
          />
          {fieldState.error ? (
            <span className={styles.error}>{fieldState.error.message}</span>
          ) : hint ? (
            <span className={styles.hint}>{hint}</span>
          ) : null}
        </div>
      )}
    />
  )
}
