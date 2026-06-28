import { ConfigProvider, theme as antTheme } from 'antd'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { lightTheme, darkTheme } from '@/themes'

// Syncs Ant Design token values to CSS custom properties on :root.
// Must live inside ConfigProvider to access theme.useToken().
function CssVarSyncer() {
  const { token } = antTheme.useToken()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', token.colorPrimary)
    root.style.setProperty('--color-primary-hover', token.colorPrimaryHover)
    root.style.setProperty('--color-text', token.colorText)
    root.style.setProperty('--color-text-secondary', token.colorTextSecondary)
    root.style.setProperty('--color-text-disabled', token.colorTextDisabled)
    root.style.setProperty('--color-bg-container', token.colorBgContainer)
    root.style.setProperty('--color-bg-layout', token.colorBgLayout)
    root.style.setProperty('--color-bg-mask', token.colorBgMask)
    root.style.setProperty('--color-border', token.colorBorder)
    root.style.setProperty('--color-border-secondary', token.colorBorderSecondary)
    root.style.setProperty('--color-success', token.colorSuccess)
    root.style.setProperty('--color-warning', token.colorWarning)
    root.style.setProperty('--color-error', token.colorError)
    root.style.setProperty('--border-radius', `${token.borderRadius}px`)
    root.style.setProperty('--font-family', token.fontFamily)
  }, [token])

  return null
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode, primaryColor, borderRadius, fontFamily } = useThemeStore()

  const algorithm =
    mode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm

  const baseTokens = mode === 'dark' ? darkTheme.token : lightTheme.token

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          ...baseTokens,
          colorPrimary: primaryColor,
          borderRadius,
          fontFamily,
        },
      }}
    >
      <CssVarSyncer />
      {children}
    </ConfigProvider>
  )
}
