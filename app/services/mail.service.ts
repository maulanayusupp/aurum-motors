// =============================================================================
// Mail service — builds `mailto:` deep links with a prefilled, localized
// subject + body. This is the primary "checkout" channel: high-ticket cars are
// bought through a human conversation, not an online cart. Keeping link-building
// here means the address/format live in one place.
// =============================================================================
import { brandConfig } from '~/config/brand.config'
import type { Car } from '~/types'
import { formatIdr } from '~/utils/format'

/** Base mailto: link with no message (used for the floating action button). */
export function mailBaseLink(): string {
  return `mailto:${brandConfig.email}`
}

/**
 * Build a mailto: link with a prefilled body (and optional subject). Pass
 * fully-composed strings (usually assembled from i18n in the calling component
 * so they respect the active locale).
 */
export function mailLink(message: string, subject?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  params.set('body', message)
  return `mailto:${brandConfig.email}?${params.toString()}`
}

/**
 * Convenience helper for a car inquiry. The caller supplies localized body and
 * subject templates with `%car%`, `%price%` and `%url%` tokens (deliberately
 * NOT vue-i18n's `{}` syntax, so the raw template survives translation) which
 * are substituted here so the message follows the visitor's language.
 */
export function carInquiryLink(
  car: Car,
  template: string,
  opts: { locale?: string; url?: string; subject?: string } = {},
): string {
  const fill = (input: string) =>
    input
      .replace('%car%', `${car.make} ${car.model} ${car.year}`)
      .replace('%price%', formatIdr(car.priceIdr, { compact: false, locale: opts.locale }))
      .replace('%url%', opts.url ?? '')
  return mailLink(fill(template), opts.subject ? fill(opts.subject) : undefined)
}
