import { Spin } from 'antd'
import { cn } from '@/utils'
import styles from './Loader.module.css'

type LoaderSize = 'sm' | 'md' | 'lg'

interface LoaderProps {
  size?: LoaderSize
  text?: string
  fullPage?: boolean
  className?: string
}

const ANT_SIZE: Record<LoaderSize, 'small' | 'default' | 'large'> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
}

export function Loader({ size = 'md', text, fullPage, className }: LoaderProps) {
  return (
    <div className={cn(styles.wrapper, fullPage && styles.fullPage, className)}>
      <Spin size={ANT_SIZE[size]} tip={text} />
    </div>
  )
}
