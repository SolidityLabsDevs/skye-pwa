// https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
// https://en.wikipedia.org/wiki/IETF_language_tag

export const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(v);
