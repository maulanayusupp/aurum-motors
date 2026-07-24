// =============================================================================
// WhatsApp service — builds wa.me deep links with a prefilled, localized
// message. This is the primary "checkout" channel: high-ticket cars are bought
// through a human conversation, not an online cart. Keeping link-building here
// means the number/format live in one place.
// =============================================================================
import { brandConfig } from '~/config/brand.config'
import type { Car } from '~/types'
import { formatIdr } from '~/utils/format'

/** Base wa.me link with no message (used for the floating action button). */
export function whatsappBaseLink(): string {
  return `https://wa.me/${brandConfig.whatsapp}`
}

/**
 * Build a wa.me link with a prefilled message. Pass a fully-composed message
 * string (usually assembled from i18n in the calling component so it respects
 * the active locale).
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${brandConfig.whatsapp}?text=${encoded}`
}

/**
 * Convenience helper for a car inquiry. The caller supplies a localized
 * template with `%car%`, `%price%` and `%url%` tokens (deliberately NOT vue-
 * i18n's `{}` syntax, so the raw template survives translation) which are
 * substituted here so the message follows the visitor's language.
 */
export function carInquiryLink(
  car: Car,
  template: string,
  opts: { locale?: string; url?: string } = {},
): string {
  const message = template
    .replace('%car%', `${car.make} ${car.model} ${car.year}`)
    .replace('%price%', formatIdr(car.priceIdr, { compact: false, locale: opts.locale }))
    .replace('%url%', opts.url ?? '')
  return whatsappLink(message)
}
