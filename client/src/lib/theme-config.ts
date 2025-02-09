import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeConfig = {
  primary: string
  radius: number
  variant: 'professional' | 'tint' | 'vibrant'
  appearance: 'light' | 'dark' | 'system'
}

interface ThemeState extends ThemeConfig {
  updateTheme: (config: Partial<ThemeConfig>) => void
}

export const useThemeConfig = create<ThemeState>()(
  persist(
    (set) => ({
      primary: '#0099ff',
      radius: 0.5,
      variant: 'professional',
      appearance: 'system',
      updateTheme: (config) => set((state) => ({ ...state, ...config })),
    }),
    {
      name: 'theme-config',
    }
  )
)
