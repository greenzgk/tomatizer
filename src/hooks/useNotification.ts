import * as React from 'react';

export function useNotification() {
  React.useEffect(() => {
    if (window.Notification && window.Notification.permission === 'default') {
      window.Notification.requestPermission()
    }
  }, [])

  const notify = React.useCallback((title: string, body?: string) => {
    if (window.Notification && window.Notification.permission === 'granted') {
      new Notification(title, { body: body })
    }
  }, [])

  return notify
}
