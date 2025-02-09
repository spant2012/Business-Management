import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BusinessSettings = {
  companyName: string
  currencySymbol: string
  dateFormat: string
  timezone: string
  features: {
    attendance: boolean
    payroll: boolean
    departments: boolean
    invoices: boolean
    reports: boolean
  }
  dashboard: {
    showInventory: boolean
    showTasks: boolean
    showAttendance: boolean
    showRevenue: boolean
  }
}

interface SettingsState extends BusinessSettings {
  updateSettings: (settings: Partial<BusinessSettings>) => void
}

const defaultSettings: BusinessSettings = {
  companyName: import.meta.env.VITE_COMPANY_NAME || "Business Management System",
  currencySymbol: import.meta.env.VITE_CURRENCY_SYMBOL || "$",
  dateFormat: import.meta.env.VITE_DATE_FORMAT || "DD/MM/YYYY",
  timezone: import.meta.env.VITE_TIMEZONE || "UTC",
  features: {
    attendance: import.meta.env.VITE_ENABLE_ATTENDANCE !== "false",
    payroll: import.meta.env.VITE_ENABLE_PAYROLL !== "false",
    departments: import.meta.env.VITE_ENABLE_DEPARTMENTS !== "false",
    invoices: import.meta.env.VITE_ENABLE_INVOICES !== "false",
    reports: import.meta.env.VITE_ENABLE_REPORTS !== "false",
  },
  dashboard: {
    showInventory: true,
    showTasks: true,
    showAttendance: true,
    showRevenue: true,
  }
}

export const useSettingsConfig = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'business-settings',
    }
  )
)
