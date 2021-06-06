/* eslint-disable import/no-unresolved */
import * as React from 'react';
import Worker from 'worker-loader!../workers/timer.worker';
import { WorkerMessage } from 'workers/worker-message';

export type TimerStatus = 'idle' | 'running' | 'finished'

const worker = new Worker()
const DEFAULT_INTERVAL_MS = 1000

export type TimerHandler = () => void
export type TickHandler = (remainingMs: number) => void

function useTimer(initialTimeout = 0, interval = DEFAULT_INTERVAL_MS) {
  const [remainingMs, setRemainingMs] = React.useState<number>(initialTimeout)
  const timeoutHandlerRef = React.useRef<TimerHandler>()
  const tickHandlerRef = React.useRef<TickHandler>()
  const [status, setStatus] = React.useState<TimerStatus>('idle')

  React.useEffect(() => {
    setRemainingMs(initialTimeout)
  }, [initialTimeout])

  worker.onmessage = (e: MessageEvent<number>) => {
    const remaining = e.data
    if (remaining >= 0) {
      setRemainingMs(remaining)
      tickHandlerRef.current?.(remaining)
    } else {
      setStatus('finished')
      timeoutHandlerRef.current?.()
    }
  }

  const stop = React.useCallback(() => {
    const message: WorkerMessage = {
      action: 'stop',
    }
    worker.postMessage(message)
    setStatus('idle')
  }, [])

  const start = React.useCallback(
    (timeout: number, onTimeout: () => void, onTick?: () => void) => {
      const message: WorkerMessage = {
        action: 'start',
        timeout,
        interval,
      }
      worker.postMessage(message)
      setStatus('running')
      setRemainingMs(timeout)
      timeoutHandlerRef.current = onTimeout
      tickHandlerRef.current = onTick
    },
    [interval]
  )

  const reset = React.useCallback((timeout: number) => {
    setStatus('idle')
    setRemainingMs(timeout)
  }, [])

  return { remainingMs, status, start, stop, reset }
}

export { DEFAULT_INTERVAL_MS, useTimer }
