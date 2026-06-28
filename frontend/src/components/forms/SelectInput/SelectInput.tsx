import { Select } from 'antd'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Label } from '@/components/typography'
import { cn } from '@/utils'
import styles from './SelectInput.module.css'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface SelectInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  options: SelectOption[]
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  hint?: string
  loading?: boolean
  allowClear?: boolean
  size?: 'small' | 'middle' | 'large'
  className?: string
}

export function SelectInput<T extends FieldValues = FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
  required,
  disabled,
  hint,
  loading,
  allowClear,
  size = 'middle',
  className,
}: SelectInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState }) => (
        <div className={cn(styles.field, className)}>
          {label && (
            <Label htmlFor={String(name)} required={required}>
              {label}
            </Label>
          )}
          <Select
            id={String(name)}
            value={value}
            onChange={(val) => onChange(val)}
            onBlur={onBlur}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
            allowClear={allowClear}
            size={size}
            status={fieldState.error ? 'error' : undefined}
            className={styles.select}
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
