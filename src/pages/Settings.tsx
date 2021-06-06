import {
    AppBar, AppBarAction, AppBarTitle, Card, ContainedButton, Duration, Form, FormItem, TextField
} from 'components';
import { defaultSettings, useSettings } from 'contexts/settings-context';
import * as React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export function Settings() {
  const [storedSettings, saveSettings] = useSettings()
  const [settings, setSettings] = React.useState(storedSettings)
  const history = useHistory()

  React.useEffect(() => {
    setSettings(storedSettings)
  }, [storedSettings])

  const handleChange = (name: string, value: number) =>
    setSettings(prev => ({ ...prev, [name]: Number.isNaN(value) ? 0 : value }))

  return (
    <>
      <AppBar>
        <AppBarAction onClick={() => history.goBack()}>
          <FaArrowLeft />
        </AppBarAction>
        <AppBarTitle>Settings</AppBarTitle>
      </AppBar>
      <main className="flex-1 px-4 container mx-auto">
        <Card>
          <Form>
            <FormItem label="Work Interval">
              <Duration
                value={settings.workInterval}
                onChange={ms => handleChange('workInterval', ms)}
              />
            </FormItem>
            <FormItem label="Short Break Interval">
              <Duration
                value={settings.shortBreakInterval}
                onChange={ms => handleChange('shortBreakInterval', ms)}
              />
            </FormItem>
            <FormItem label="Long Break Interval">
              <Duration
                value={settings.longBreakInterval}
                onChange={ms => handleChange('longBreakInterval', ms)}
              />
            </FormItem>
            <FormItem label="Long break after">
              <TextField
                type="number"
                min="1"
                value={settings.workIntervalsCountBeforeLongBreak}
                className="w-10"
                onChange={e =>
                  handleChange(
                    'workIntervalsCountBeforeLongBreak',
                    e.target.valueAsNumber
                  )
                }
              />
            </FormItem>
          </Form>
          <div className="flex flex-row justify-end gap-4">
            <ContainedButton primary onClick={() => saveSettings(settings)}>
              Save
            </ContainedButton>
            <ContainedButton
              secondary
              onClick={() => setSettings(defaultSettings)}
            >
              Restore
            </ContainedButton>
          </div>
        </Card>
      </main>
    </>
  )
}
