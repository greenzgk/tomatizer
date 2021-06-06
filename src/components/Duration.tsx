import * as React from 'react';
import { format2digits, msToHours, msToMins, msToSecs } from 'utils';

import { TextField } from './TextField';

export interface DurationProps {
  value?: number
  onChange?: (ms: number) => void
}

export function Duration({ value, onChange }: DurationProps) {
  const [ms, setMs] = React.useState(0)

  const hoursRef = React.createRef<HTMLInputElement>()
  const minsRef = React.createRef<HTMLInputElement>()
  const secsRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    if (!value) return
    setMs(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(/^\d+$/g)) return

    const hours = Number(hoursRef.current?.value ?? 0)
    const mins = Number(minsRef.current?.value ?? 0)
    const secs = Number(secsRef.current?.value ?? 0)

    const value = ((hours * 60 + mins) * 60 + secs) * 1000

    setMs(value)
    onChange?.(value)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const textFieldProps = {
    className: 'w-10',
    type: 'text',
    placeholder: '00',
    min: 0,
    onChange: handleChange,
    onFocus: handleFocus,
  }

  const hours = format2digits(msToHours(ms))
  const mins = format2digits(msToMins(ms))
  const secs = format2digits(msToSecs(ms))

  return (
    <div className="flex flex-row-reverse gap-1">
      <TextField {...textFieldProps} value={secs} ref={secsRef} />
      <span>:</span>
      <TextField {...textFieldProps} value={mins} ref={minsRef} />
      <span>:</span>
      <TextField {...textFieldProps} value={hours} ref={hoursRef} />
    </div>
  )
}
