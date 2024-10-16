/**
 * Formats an integer amount to a string with commas as thousand separators.
 *
 * @param amount - The integer amount to be formatted.
 * @returns The formatted amount string.
 */
export function formatAmount(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
