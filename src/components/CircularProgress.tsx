import clsx from 'clsx';
import * as React from 'react';

import { MuiProps } from './props';

export interface CircularProgressProps {
  value: number
  max?: number
  strokeWidth?: number
}

const strokeDasharray = 283 // circumference = 2 * 3.1415927 * circleRadius

export const CircularProgress: React.FC<MuiProps<CircularProgressProps>> = ({
  value,
  max = 100,
  strokeWidth = 1,
  primary,
  secondary,
  className,
  children,
}) => {
  const percentage = value / max
  const strokeDashoffset = strokeDasharray - strokeDasharray * percentage

  return (
    <div className={clsx('relative text-center', className)}>
      <svg
        className={clsx(
          primary && 'text-primary',
          secondary && 'text-secondary'
        )}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="fill-transparent transform origin-center -rotate-90 stroke-current"
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
      {children && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      )}
    </div>
  )
}
