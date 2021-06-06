import { AppAction } from 'app-types';
import { Card, ContainedButton, DigitalWatchFace } from 'components';
import { initialAppState, useAppState } from 'contexts/app-state-context';
import { useSettings } from 'contexts/settings-context';
import { DEFAULT_INTERVAL_MS, useDocumentTitle, useNotification, useTimer } from 'hooks';
import * as React from 'react';

import { CountStatCard, TimeStatCard } from './cards';
import { Header } from './Header';

export function TimerPage() {
  const [appState, setAppState] = useAppState()
  const [settings] = useSettings()
  const { remainingMs, start, stop, reset, status: timerStatus } = useTimer(
    settings.workInterval
  )
  const notify = useNotification()

  const { count, status, nextAction, workMs, breakMs } = appState

  useDocumentTitle(remainingMs, count, status)

  const max: Record<AppAction, number> = {
    longBreak: settings.longBreakInterval,
    break: settings.shortBreakInterval,
    work: settings.workInterval,
  }

  const handleWorkTick = React.useCallback(() => {
    setAppState(prev => ({
      ...prev,
      workMs: prev.workMs + DEFAULT_INTERVAL_MS,
    }))
  }, [setAppState])

  const handleRestTick = React.useCallback(() => {
    setAppState(prev => ({
      ...prev,
      breakMs: prev.breakMs + DEFAULT_INTERVAL_MS,
    }))
  }, [setAppState])

  const restTimeout = React.useCallback(() => {
    notify("It's working time!")
    reset(settings.workInterval)
    setAppState(prev => ({
      ...prev,
      count: prev.count + 1,
      nextAction: 'work',
      status: 'idle',
    }))
  }, [notify, reset, setAppState, settings.workInterval])

  const workTimeout = React.useCallback(() => {
    notify("It's resting time!")
    reset(settings.shortBreakInterval)

    const nextCount = count + 1

    const next =
      nextCount > 0 &&
      nextCount % settings.workIntervalsCountBeforeLongBreak === 0
        ? 'longBreak'
        : 'break'
    setAppState(prev => ({ ...prev, nextAction: next }))
  }, [
    count,
    notify,
    reset,
    setAppState,
    settings.shortBreakInterval,
    settings.workIntervalsCountBeforeLongBreak,
  ])

  const handleStart = () => {
    switch (nextAction) {
      case 'work':
        setAppState(prev => ({ ...prev, status: 'work' }))
        start(settings.workInterval, workTimeout, handleWorkTick)
        break
      case 'break':
        setAppState(prev => ({ ...prev, status: 'break' }))
        start(settings.shortBreakInterval, restTimeout, handleRestTick)
        break
      case 'longBreak':
        setAppState(prev => ({ ...prev, status: 'break' }))
        start(settings.longBreakInterval, restTimeout, handleRestTick)
        break
    }
  }

  const handleStop = () => {
    stop()
    const timeout =
      status === 'work'
        ? settings.workInterval
        : nextAction === 'break'
        ? settings.shortBreakInterval
        : settings.longBreakInterval

    setAppState(prev => ({
      ...prev,
      status: 'idle',
      workMs:
        status === 'work' ? prev.workMs - timeout + remainingMs : prev.workMs,
      breakMs:
        status !== 'work' ? prev.breakMs - timeout + remainingMs : prev.breakMs,
    }))
    reset(timeout)
  }

  const handleDone = () => {
    setAppState(initialAppState)
    reset(settings.workInterval)
  }

  function renderButtons() {
    if (timerStatus === 'running') {
      return (
        <ContainedButton secondary onClick={handleStop}>
          Cancel
        </ContainedButton>
      )
    }

    return (
      <>
        <ContainedButton primary onClick={handleStart}>
          {nextAction === 'work' ? (count > 0 ? 'Next' : 'Start') : 'Rest'}
        </ContainedButton>
        {nextAction === 'work' && count > 0 && (
          <ContainedButton secondary onClick={handleDone}>
            Done
          </ContainedButton>
        )}
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex px-4 flex-col w-full md:container md:mx-auto gap-4">
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <CountStatCard count={count} />
          <TimeStatCard ms={workMs} type="work" />
          <TimeStatCard ms={breakMs} type="break" />
        </div>
        <Card className="flex-1 flex flex-col items-stretch justify-between">
          <div className="flex-1 flex justify-center items-center">
            <DigitalWatchFace ms={remainingMs} max={max[nextAction]} />
          </div>
        </Card>
        <Card>
          <div className="flex justify-center px-4 gap-4">
            {renderButtons()}
          </div>
        </Card>
      </main>
    </>
  )
}
