import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode } from '@/types'
import { themeDefaults } from '@/themes'

interface ThemeState {
  mode: ThemeMode
  primaryColor: string
  borderRadius: number
  fontFamily: string
  setMode: (mode: ThemeMode) => void
  setPrimaryColor: (color: string) => void
  setBorderRadius: (radius: number) => void
  setFontFamily: (font: string) => void
  reset: () => void
}

const initialState = {
  mode: 'dark' as ThemeMode,
  primaryColor: themeDefaults.primaryColor,
  borderRadius: themeDefaults.borderRadius,
  fontFamily: themeDefaults.fontFamily,
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      setMode: (mode) => set({ mode }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setBorderRadius: (borderRadius) => set({ borderRadius }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      reset: () => set(initialState),
    }),
    { name: 'theme-store' },
  ),
)
