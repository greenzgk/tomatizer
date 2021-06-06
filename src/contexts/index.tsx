import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppStateProvider } from './app-state-context';
import { SettingsProvider } from './settings-context';

export const AppProviders: React.FC = ({ children }) => (
  <Router basename="/pomidorka">
    <AppStateProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </AppStateProvider>
  </Router>
)
