import clsx from 'clsx';

import { ButtonProps, IconButton } from './Button';
import { MuiProps } from './props';

const AppBar: React.FC<MuiProps> = ({
  className,
  primary = true,
  secondary,
  children,
}) => {
  return (
    <header
      className={clsx(
        'shadow-md flex flex-row items-center gap-4',
        primary && 'bg-primary text-on-primary',
        secondary && 'bg-secondary text-on-secondary',
        className
      )}
    >
      {children}
    </header>
  )
}

export type AppBarTitleProps = React.DetailedHTMLProps<
  React.HtmlHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>
const AppBarTitle: React.FC<AppBarTitleProps> = ({
  children,
  className,
  ...props
}) => (
  <h6 className={clsx('flex-1 p-4', className)} {...props}>
    {children}
  </h6>
)

const AppBarAction: React.FC<ButtonProps> = ({ className, ...props }) => (
  <IconButton
    className={clsx(
      'text-2xl outline-none focus:outline-none focus:border-none',
      className
    )}
    {...props}
  />
)

export { AppBar, AppBarTitle, AppBarAction }
