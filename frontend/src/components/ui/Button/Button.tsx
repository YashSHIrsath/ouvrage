import { Button as AntButton } from 'antd'
import type { ReactNode } from 'react'
import { cn } from '@/utils'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  block?: boolean
  children?: ReactNode
  onClick?: () => void
  htmlType?: 'button' | 'submit' | 'reset'
  className?: string
}

const ANT_TYPE: Record<ButtonVariant, 'primary' | 'default' | 'dashed' | 'text' | 'link'> = {
  primary: 'primary',
  default: 'default',
  dashed: 'dashed',
  text: 'text',
  link: 'link',
  danger: 'primary',
}

const ANT_SIZE: Record<ButtonSize, 'small' | 'middle' | 'large'> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  icon,
  block,
  children,
  onClick,
  htmlType = 'button',
  className,
}: ButtonProps) {
  return (
    <AntButton
      type={ANT_TYPE[variant]}
      danger={variant === 'danger'}
      size={ANT_SIZE[size]}
      loading={loading}
      disabled={disabled}
      icon={icon}
      block={block}
      onClick={onClick}
      htmlType={htmlType}
      className={cn(styles.button, className)}
    >
      {children}
    </AntButton>
  )
}
