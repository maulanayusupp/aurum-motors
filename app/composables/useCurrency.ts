// =============================================================================
// Locale-aware currency/number formatting. Wraps the pure helpers in
// `utils/format` and binds them to the active i18n locale so figures render
// correctly as the visitor switches language.
// =============================================================================
import { formatIdr, formatNumber } from '~/utils/format'

export const useCurrency = () => {
  const { locale } = useI18n()

  /** Compact price (e.g. "Rp 4,85 M"). */
  const price = (amount: number) =>
    formatIdr(amount, { compact: true, locale: locale.value })

  /** Exact grouped price (e.g. "Rp 4.850.000.000"). */
  const priceFull = (amount: number) =>
    formatIdr(amount, { compact: false, locale: locale.value })

  /** Grouped integer (e.g. odometer). */
  const number = (value: number) => formatNumber(value, locale.value)

  return { price, priceFull, number }
}
