import { AppAction, AppStatus } from 'app-types';
import * as React from 'react';

export interface AppState {
  count: number
  status: AppStatus
  nextAction: AppAction
  workMs: number
  breakMs: number
}

const initialAppState: AppState = {
  count: 0,
  status: 'idle',
  nextAction: 'work',
  workMs: 0,
  breakMs: 0,
}

const AppStateContext = React.createContext<
  [AppState, React.Dispatch<React.SetStateAction<AppState>>] | null
>(null)
AppStateContext.displayName = 'AppStateContext'

function AppStateProvider(props: any) {
  const [appState, setAppState] = React.useState<AppState>(initialAppState)

  const value: [
    AppState,
    React.Dispatch<React.SetStateAction<AppState>>
  ] = React.useMemo(() => [appState, setAppState], [appState])

  return <AppStateContext.Provider {...props} value={value} />
}

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider')
  }
  return context
}

export { AppStateProvider, useAppState, initialAppState }
