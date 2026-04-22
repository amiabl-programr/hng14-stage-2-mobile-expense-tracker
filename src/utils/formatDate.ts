import { format, isToday, isYesterday } from 'date-fns'

export function formatTransactionDate(isoString: string): string {
  const date = new Date(isoString)
  if (isToday(date)) return 'TODAY'
  if (isYesterday(date)) return 'YESTERDAY'
  return format(date, 'MMM d').toUpperCase()
}

export function formatTransactionTime(isoString: string): string {
  return format(new Date(isoString), 'h:mm a')
}

export function formatMonthYear(isoString: string): string {
  return format(new Date(isoString), 'MMMM yyyy')
}