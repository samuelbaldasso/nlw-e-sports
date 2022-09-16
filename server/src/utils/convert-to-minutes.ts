export function convertToMin(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  const minutesAmount = (hours * 60) + minutes
  return minutesAmount
}