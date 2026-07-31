// =============================================================================
// Brand configuration (non-textual). Swap these values to rebrand the site.
// NOTE: "AURUM" is an editable PLACEHOLDER showroom brand, not a real company.
// If a logo is provided later, derive the accent colours from it here and keep
// them in sync with `_tokens.scss`.
// =============================================================================
import type { SocialLink } from '~/types'

export const brandConfig = {
  /** Display name of the brand. */
  name: 'AURUM',
  /** Longer lockup used in a few headings/footer. */
  fullName: 'AURUM Motorworks',
  /** Founding/registration year, shown in the footer. */
  since: 2019,
  /** Primary accent — champagne gold (mirrors --color-gold in SCSS tokens). */
  accent: '#c9a24b',
  accentAlt: '#e7cf9b',
  /**
   * The single contact endpoint (overridable via runtimeConfig / env). Email is
   * the only channel the showroom publishes — no phone, no WhatsApp.
   */
  email: 'maulanayusupp@gmail.com',
  /** Sales contact person surfaced in the UI. */
  contactName: 'Maulana Yusup Abdullah',
  /** City/region shown in contact + schema (i18n key holds the full address). */
  addressKey: 'contact.info.addressValue',
} as const

export const socialLinks: readonly SocialLink[] = [
  { id: 'instagram', href: 'https://instagram.com', icon: 'instagram' },
  { id: 'youtube', href: 'https://youtube.com', icon: 'youtube' },
] as const
