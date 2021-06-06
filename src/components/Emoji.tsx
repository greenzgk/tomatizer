import * as React from 'react';

import { ClassNameProps } from './props';

export interface EmojiProps extends ClassNameProps {
  symbol: string
  label: string
}

const Emoji = React.memo<EmojiProps>(({ label, symbol, className }) => (
  <span className={className} role="img" aria-label={label}>
    {symbol}
  </span>
))
Emoji.displayName = 'Emoji'

export { Emoji }
