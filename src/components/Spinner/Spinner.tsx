import './Spinner.css';

import clsx from 'clsx';

import { MuiProps } from '../props';

export interface SpinnerProps {
  size?: number
}

export const Spinner: React.FC<MuiProps<SpinnerProps>> = ({
  size = 40,
  className,
  primary,
  secondary,
}) => (
  <svg
    style={{ height: size + 'px', width: size + 'px' }}
    className={clsx(
      'spinner',
      primary && 'text-primary',
      secondary && 'text-secondary',
      className
    )}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" />
  </svg>
)
