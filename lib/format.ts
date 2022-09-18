const FORMATTER = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export function formatNumber(number: number): string {
  return FORMATTER.format(number);
}
