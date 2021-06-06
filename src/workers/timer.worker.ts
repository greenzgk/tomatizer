import { WorkerMessage } from './worker-message';

const ctx: Worker = self as any
let timerId: number | undefined

function stop() {
  if (timerId == null) return

  self.clearTimeout(timerId)
  timerId = undefined
}

function start(timeout: number, interval: number) {
  let count = 1

  function timer() {
    const remaining = timeout - interval * count++

    timerId = remaining >= 0 ? self.setTimeout(timer, interval) : undefined
    ctx.postMessage(remaining)
  }

  if (timerId) {
    stop()
  }
  timer()
}

ctx.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { action, timeout, interval } = e.data

  if (action === 'start' && timeout && interval) {
    start(timeout, interval)
  }

  if (action === 'stop') {
    stop()
  }
}

export {}
