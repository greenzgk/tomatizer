import { Settings, TimerPage } from 'pages';
import { Route, Switch } from 'react-router-dom';

import { Footer } from './components';

function App() {
  return (
    <div className="min-h-screen min-w-min flex flex-col gap-4 text-on-bg bg-background">
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <TimerPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
