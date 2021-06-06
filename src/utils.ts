const format2digits = (num: number, minimumIntegerDigits = 2) =>
  num.toLocaleString(undefined, { minimumIntegerDigits })

const msToSecs = (ms: number) => Math.floor(ms / 1000) % 60
const msToMins = (ms: number) => Math.floor(ms / 1000 / 60) % 60
const msToHours = (ms: number) => Math.floor(ms / 1000 / 60 / 60)

function replace<T>(arr: T[], index: number, ...items: T[]) {
  const arrCopy = [...arr]
  arrCopy.splice(index, items.length, ...items)
  return arrCopy
}

function getTimeString(ms: number) {
  const hours = format2digits(msToHours(ms))
  const mins = format2digits(msToMins(ms))
  const secs = format2digits(msToSecs(ms))

  return `${hours}:${mins}:${secs}`
}

export { format2digits, msToHours, msToMins, msToSecs, replace, getTimeString }
