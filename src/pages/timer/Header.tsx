import { AppBar, AppBarAction, AppBarTitle, Emoji } from 'components';
import * as React from 'react';
import { FaCog } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export const Header = React.memo(() => {
  const history = useHistory()

  return (
    <AppBar primary>
      <AppBarTitle>
        <Emoji symbol="🍅" label="tomato" /> Another Pomodoro Timer
      </AppBarTitle>
      <AppBarAction onClick={() => history.push('/settings')}>
        <FaCog />
      </AppBarAction>
    </AppBar>
  )
})
Header.displayName = 'Header'
