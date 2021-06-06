import clsx from 'clsx';

import { ClassNameProps } from './props';

export const Card: React.FC<ClassNameProps> = ({ className, children }) => (
  <div
    className={clsx(
      'p-4 rounded shadow-md bg-surface text-on-surface',
      className
    )}
  >
    {children}
  </div>
)
