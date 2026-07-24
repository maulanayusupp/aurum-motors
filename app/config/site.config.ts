// =============================================================================
// Homepage / marketing structural content (icons + i18n keys only).
// =============================================================================
import type { ProcessStep, Testimonial, ValueProp } from '~/types'

/** "Why buy from AURUM" value propositions. */
export const valueProps: readonly ValueProp[] = [
  { id: 'inspection', icon: 'shield', titleKey: 'home.value.inspection.title', bodyKey: 'home.value.inspection.body' },
  { id: 'curated', icon: 'sparkles', titleKey: 'home.value.curated.title', bodyKey: 'home.value.curated.body' },
  { id: 'transparent', icon: 'eye', titleKey: 'home.value.transparent.title', bodyKey: 'home.value.transparent.body' },
  { id: 'concierge', icon: 'chat', titleKey: 'home.value.concierge.title', bodyKey: 'home.value.concierge.body' },
] as const

/** The buying journey shown as numbered steps. */
export const processSteps: readonly ProcessStep[] = [
  { id: 'browse', icon: 'search', titleKey: 'home.process.browse.title', bodyKey: 'home.process.browse.body' },
  { id: 'consult', icon: 'chat', titleKey: 'home.process.consult.title', bodyKey: 'home.process.consult.body' },
  { id: 'inspect', icon: 'shield', titleKey: 'home.process.inspect.title', bodyKey: 'home.process.inspect.body' },
  { id: 'drive', icon: 'key', titleKey: 'home.process.drive.title', bodyKey: 'home.process.drive.body' },
] as const

/** Customer testimonials — quotes/names live in i18n by id. */
export const testimonials: readonly Testimonial[] = [
  { id: 't1', icon: 'quote', rating: 5 },
  { id: 't2', icon: 'quote', rating: 5 },
  { id: 't3', icon: 'quote', rating: 5 },
] as const

/** Manufacturer marquee (proper nouns, not translated). */
export const marqueeBrands: readonly string[] = [
  'Mercedes-AMG',
  'Porsche',
  'Lamborghini',
  'BMW',
  'Audi',
  'Tesla',
  'Land Rover',
  'Chevrolet',
] as const
