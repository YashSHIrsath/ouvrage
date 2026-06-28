import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ServicePanelState {
  isCollapsed: boolean
  toggleCollapsed: () => void
  setCollapsed: (val: boolean) => void
}

export const useServicePanelStore = create<ServicePanelState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleCollapsed: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      setCollapsed: (val) => set({ isCollapsed: val }),
    }),
    {
      name: 'services-panel',
    }
  )
)
