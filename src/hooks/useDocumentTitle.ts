import { appStatusTitles } from 'app-constants';
import { AppStatus } from 'app-types';
import * as React from 'react';

import { format2digits, msToMins, msToSecs } from '../utils';

export function useDocumentTitle(
  remainingMs: number,
  count: number,
  status: AppStatus
) {
  React.useEffect(() => {
    const secs = format2digits(msToSecs(remainingMs))
    const mins = format2digits(msToMins(remainingMs))
    const countdown = status !== 'idle' ? `${mins}:${secs} | ` : ''
    document.title = `${count} | ${countdown}${appStatusTitles[status]} - Another Pomodoro Timer`
  }, [count, remainingMs, status])
}
