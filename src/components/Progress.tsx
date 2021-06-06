export interface ProgressProps {
  max: number
  value: number
  reverse?: boolean
}

export function Progress({ value, max = 100, reverse = false }: ProgressProps) {
  const x = value / max
  const width = `calc(${reverse ? '' : '100% - '}100% * ${x})`

  return (
    <div className="bg-gray-300">
      <div className="h-full bg-secondary" style={{ width }}>
        &nbsp;
      </div>
    </div>
  )
}
