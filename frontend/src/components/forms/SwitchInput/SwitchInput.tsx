import { Switch } from 'antd'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Label } from '@/components/typography'
import { cn } from '@/utils'
import styles from './SwitchInput.module.css'

interface SwitchInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  hint?: string
  disabled?: boolean
  checkedLabel?: string
  uncheckedLabel?: string
  className?: string
}

export function SwitchInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  hint,
  disabled,
  checkedLabel,
  uncheckedLabel,
  className,
}: SwitchInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState }) => (
        <div className={cn(styles.field, className)}>
          <div className={styles.row}>
            <Switch
              checked={Boolean(value)}
              onChange={(checked) => onChange(checked)}
              disabled={disabled}
              checkedChildren={checkedLabel}
              unCheckedChildren={uncheckedLabel}
            />
            {label && <Label className={styles.inlineLabel}>{label}</Label>}
          </div>
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
