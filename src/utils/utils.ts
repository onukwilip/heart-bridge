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
