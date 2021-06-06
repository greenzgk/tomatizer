import clsx from 'clsx';
import * as React from 'react';

import { ClassNameProps } from './props';

export const Form: React.FC<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
> = props => <form {...props} />

export interface FormItemProps extends ClassNameProps {
  label: string
  col?: boolean
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  col,
  className,
  children,
}) => (
  <label className={clsx('flex mb-4 last:mb-0', col && 'flex-col', className)}>
    <span className={clsx(!col && 'flex-1')}>{label}</span>
    {children}
  </label>
)
