// =============================================================================
// Navigation & structural content config (routes + i18n label keys only).
// No human-readable text lives here — labels are i18n keys resolved in the UI.
// =============================================================================
import type { ComplianceItem, NavItem } from '~/types'

/** Primary header navigation. */
export const mainNav: readonly NavItem[] = [
  { id: 'inventory', labelKey: 'nav.inventory', to: '/inventory' },
  { id: 'about', labelKey: 'nav.about', to: '/about' },
  { id: 'compliance', labelKey: 'nav.compliance', to: '/compliance' },
  { id: 'contact', labelKey: 'nav.contact', to: '/contact' },
] as const

/** Footer "explore" column. */
export const footerExploreNav: readonly NavItem[] = [
  { id: 'inventory', labelKey: 'nav.inventory', to: '/inventory' },
  { id: 'about', labelKey: 'nav.about', to: '/about' },
  { id: 'contact', labelKey: 'nav.contact', to: '/contact' },
] as const

/** Footer legal column. */
export const footerLegalNav: readonly NavItem[] = [
  { id: 'compliance', labelKey: 'nav.compliance', to: '/compliance' },
  { id: 'privacy', labelKey: 'nav.privacy', to: '/privacy' },
  { id: 'terms', labelKey: 'nav.terms', to: '/terms' },
] as const

/** Trust / compliance statements. Text lives in i18n by `id`. */
export const complianceItems: readonly ComplianceItem[] = [
  { id: 'inspection', icon: 'shield', titleKey: 'compliance.items.inspection.title', bodyKey: 'compliance.items.inspection.body' },
  { id: 'documents', icon: 'document', titleKey: 'compliance.items.documents.title', bodyKey: 'compliance.items.documents.body' },
  { id: 'privacy', icon: 'lock', titleKey: 'compliance.items.privacy.title', bodyKey: 'compliance.items.privacy.body' },
  { id: 'transparency', icon: 'eye', titleKey: 'compliance.items.transparency.title', bodyKey: 'compliance.items.transparency.body' },
  { id: 'payment', icon: 'card', titleKey: 'compliance.items.payment.title', bodyKey: 'compliance.items.payment.body' },
  { id: 'warranty', icon: 'sparkles', titleKey: 'compliance.items.warranty.title', bodyKey: 'compliance.items.warranty.body' },
] as const
