/**
 * * Function responsible for converting a number to a currency
 * @param value The number to be converted to currency
 * @param locale The type of currency, e.g. en-NG or en-US
 * @param currency The string to prefix the amount
 * @returns The formatted amount as a currency
 */
export const format_currency = (
  value: number,
  locale: string = "en-NG",
  currency: string = "NGN"
) => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
};

/**
 * * Compares the provided date with the current date, and returns the timelapse
 * @param creation_date The date to compare against
 * @returns The timelapse of the comparison
 */
export const get_timelapse = (creation_date: Date | number | string) => {
  const now = new Date();
  const created = new Date(creation_date);
  const diff_ms = now.getTime() - created.getTime(); // Difference in milliseconds

  const diff_seconds = Math.floor(diff_ms / 1000);
  const diff_minutes = Math.floor(diff_seconds / 60);
  const diff_hours = Math.floor(diff_minutes / 60);
  const diff_days = Math.floor(diff_hours / 24);

  if (diff_seconds < 60) {
    return `${diff_seconds < 0 ? 1 : diff_seconds}s`; // Less than 1 minute
  } else if (diff_minutes < 60) {
    return `${diff_minutes}m`; // Less than 1 hour
  } else if (diff_hours < 24) {
    return `${diff_hours}h`; // Less than 1 day
  } else {
    return `${diff_days}d`; // More than 1 day
  }
};
