export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatChange(amount: number): string {
  const prefix = amount >= 0 ? '+' : ''
  return `${prefix}${formatCurrency(amount)}`
}