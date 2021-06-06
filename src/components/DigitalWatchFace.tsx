import clsx from 'clsx';
import { CircularProgress } from 'components';

import { format2digits, msToMins, msToSecs } from '../utils';

export interface DigitalWatchFaceProps {
  ms: number
  max: number
}

export function DigitalWatchFace({ ms, max }: DigitalWatchFaceProps) {
  const secs = format2digits(msToSecs(ms))
  const mins = format2digits(msToMins(ms))
  const isDone = ms === 0 ? 'text-red-500' : ''

  return (
    <CircularProgress
      secondary
      value={ms}
      max={max}
      className="w-full max-w-md"
    >
      <div className={clsx('text-8xl sm:text-9xl', isDone && 'text-red-500')}>
        <div>{mins}</div>
        <div>{secs}</div>
      </div>
    </CircularProgress>
  )
}
