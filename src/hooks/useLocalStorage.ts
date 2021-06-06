import * as React from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (item: T) => void] {
  const [item, setItem] = React.useState<T>(defaultValue)

  React.useEffect(() => {
    const loadedItem = localStorage.getItem(key)
    if (loadedItem) {
      setItem(JSON.parse(loadedItem))
    }
  }, [key])

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      setItem(e.newValue ? JSON.parse(e.newValue) : undefined)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  const saveItem = React.useCallback(
    (newItem: T) => {
      localStorage.setItem(key, JSON.stringify(newItem))
      setItem(newItem)
    },
    [key]
  )

  return [item, saveItem]
}
