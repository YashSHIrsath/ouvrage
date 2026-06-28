import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils'
import styles from './AdminButton.module.css'

type AdminButtonVariant = 'primary' | 'default' | 'danger' | 'ghost'
type AdminButtonSize = 'sm' | 'md' | 'lg'

interface AdminButtonProps {
  children?: ReactNode
  variant?: AdminButtonVariant
  size?: AdminButtonSize
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  block?: boolean
  onClick?: () => void
  htmlType?: 'button' | 'submit' | 'reset'
  className?: string
}

const VARIANT_MAP: Record<AdminButtonVariant, 'primary' | 'default' | 'danger' | 'dashed'> = {
  primary: 'primary',
  default: 'default',
  danger:  'danger',
  ghost:   'dashed',
}

export function AdminButton({
  children,
  variant = 'default',
  size = 'md',
  loading,
  disabled,
  icon,
  block,
  onClick,
  htmlType = 'button',
  className,
}: AdminButtonProps) {
  return (
    <Button
      variant={VARIANT_MAP[variant]}
      size={size}
      loading={loading}
      disabled={disabled}
      icon={icon}
      block={block}
      onClick={onClick}
      htmlType={htmlType}
      className={cn(styles.adminButton, className)}
    >
      {children}
    </Button>
  )
}
