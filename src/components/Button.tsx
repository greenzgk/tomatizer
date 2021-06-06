import clsx from 'clsx';

import { MuiProps } from './props';

export type ButtonProps = MuiProps<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

const ContainedButton: React.FC<ButtonProps> = ({
  primary,
  secondary,
  className,
  ...props
}) => (
  <button
    className={clsx(
      'px-4 py-2 border-none rounded uppercase shadow-md hover:shadow-lg active:shadow-2xl',
      primary &&
        'bg-primary text-on-primary hover:bg-primary-dark active:bg-primary-light',
      secondary &&
        'bg-secondary text-on-secondary hover:bg-secondary-dark active:bg-secondary-light',
      className
    )}
    {...props}
  />
)

const OutlinedButton: React.FC<ButtonProps> = ({
  primary,
  secondary,
  className,
  ...props
}) => (
  <button
    className={clsx(
      'px-4 py-2 border border-solid rounded uppercase',
      primary && 'bg-primary text-on-primary hover:bg-primary-light',
      secondary && 'bg-secondary text-on-secondary hover:bg-secondary-light',
      className
    )}
    {...props}
  />
)

const TextButton: React.FC<ButtonProps> = ({
  primary,
  secondary,
  className,
  ...props
}) => (
  <button
    className={clsx(
      'px-2 py-1 uppercase',
      primary && 'text-primary',
      secondary && 'text-secondary',
      className
    )}
    {...props}
  />
)

const IconButton: React.FC<ButtonProps> = ({
  primary,
  secondary,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded-full p-3',
        !primary && !secondary && 'hover:bg-hover',
        primary && 'text-on-primary hover:bg-primary-light',
        secondary && 'text-on-secondary hover:bg-secondary-light',
        className
      )}
      {...props}
    />
  )
}

export { ContainedButton, OutlinedButton, TextButton, IconButton }
