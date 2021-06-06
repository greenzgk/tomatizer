import clsx from 'clsx';
import * as React from 'react';

export const TextField = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ className, ...props }, ref) => {
  return (
    <input
      className={clsx(
        'border-b rounded-none focus:border-primary-light border-on-bg',
        props.type === 'text' ? 'px-2' : 'pl-2',
        className
      )}
      {...props}
      ref={ref}
    />
  )
})
TextField.displayName = 'TextField'
