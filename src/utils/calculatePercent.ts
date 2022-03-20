export function calculatePercent(
  previousValue: number,
  currentValue: number
): string {
  const result = (100 * (previousValue - currentValue)) / currentValue;
  if (result > 0) {
    return `+${result.toFixed(2)}`.replace('.', ',');
  } else {
    return `\u2212${Math.abs(result).toFixed(2)}`.replace('.', ',');
  }
}
