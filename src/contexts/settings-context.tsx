import { useLocalStorage } from 'hooks';
import * as React from 'react';

export interface AppSettings {
  longBreakInterval: number
  shortBreakInterval: number
  workInterval: number
  workIntervalsCountBeforeLongBreak: number
}

export type SettingsContextValueType = [
  AppSettings,
  (settings: AppSettings) => void
]

const defaultSettings: AppSettings = {
  longBreakInterval: 900000, // 15mins
  shortBreakInterval: 300000, // 5mins
  workInterval: 1500000, // 25mins
  workIntervalsCountBeforeLongBreak: 4,
}

const SettingsContext = React.createContext<SettingsContextValueType | null>(
  null
)
SettingsContext.displayName = 'SettingsContext'

function SettingsProvider(props: any) {
  const [settings, saveSettings] = useLocalStorage(
    'gk.greenz.pomodoro.settings',
    defaultSettings
  )

  const value: SettingsContextValueType = React.useMemo(
    () => [settings, saveSettings],
    [saveSettings, settings]
  )

  return <SettingsContext.Provider {...props} value={value} />
}

function useSettings() {
  const context = React.useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within the SettingsProvider')
  }
  return context
}

export { SettingsProvider, useSettings, defaultSettings }
