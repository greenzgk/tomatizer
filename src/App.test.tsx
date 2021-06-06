import { AppStateProvider } from 'contexts/app-state-context';
import { SettingsProvider } from 'contexts/settings-context';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { render, screen } from '@testing-library/react';

import App from './App';

test('first test', () => {
  render(
    <MemoryRouter>
      <AppStateProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AppStateProvider>
    </MemoryRouter>
  )
  const linkElement = screen.getByText(/another pomodoro timer/i)
  expect(linkElement).toBeInTheDocument()
})
