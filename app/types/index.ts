// =============================================================================
// Shared TypeScript types for the whole app. Kept framework-agnostic so the
// data layer (config/services) and the UI layer agree on shapes.
// =============================================================================

/** A single navigation entry. `labelKey` is an i18n key, not literal text. */
export interface NavItem {
  id: string
  labelKey: string
  to: string
}

/** A social/contact link shown in the footer. */
export interface SocialLink {
  id: string
  href: string
  icon: string
}

/** Fuel/drivetrain classification used for filtering and badges. */
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric'

/** Whether the unit is brand-new or pre-owned (used). */
export type CarCondition = 'new' | 'used'

/** High-level body style, used for filtering and the fallback illustration. */
export type BodyType =
  | 'coupe'
  | 'sedan'
  | 'suv'
  | 'sport'
  | 'hatchback'
  | 'convertible'

/** A single specification row rendered on the detail page. */
export interface CarSpec {
  /** i18n key for the spec label (e.g. `car.specs.engine`). */
  labelKey: string
  /** Already-formatted value (kept locale-neutral: numbers + units). */
  value: string
  /** Optional icon id from iconPaths. */
  icon?: string
}

/**
 * A car listing. Textual, human-readable copy (descriptions, feature names)
 * lives in i18n keyed by `slug`; this config holds structure + hard facts only.
 */
export interface Car {
  /** URL-safe unique id, also the i18n key namespace for this car. */
  slug: string
  /** Manufacturer, e.g. "Porsche". Proper noun — not translated. */
  make: string
  /** Model name, e.g. "911 Carrera S". Proper noun — not translated. */
  model: string
  /** Model/manufacture year. */
  year: number
  /** Price in Indonesian Rupiah (base currency of the catalog). */
  priceIdr: number
  condition: CarCondition
  bodyType: BodyType
  fuel: FuelType
  transmission: 'automatic' | 'manual'
  /** Odometer in kilometres (0 for brand-new units). */
  mileageKm: number
  /** Power output in horsepower. */
  horsepower: number
  /** 0–100 km/h in seconds. */
  acceleration: number
  /** Seating capacity. */
  seats: number
  /** Exterior colour name — i18n key under `colors.*`. */
  colorKey: string
  /** Primary image path (in /public/cars). */
  image: string
  /** Gallery image paths (includes the primary image first). */
  gallery: string[]
  /** Feature i18n keys rendered as a bulleted highlights list. */
  featureKeys: string[]
  /** Marks a hand-picked unit for the homepage "featured" rail. */
  featured?: boolean
}

/** A homepage value proposition / why-choose-us item. */
export interface ValueProp {
  id: string
  icon: string
  titleKey: string
  bodyKey: string
}

/** A step in the buying process shown on the homepage. */
export interface ProcessStep {
  id: string
  icon: string
  titleKey: string
  bodyKey: string
}

/** A customer testimonial. Quote/name live in i18n by id. */
export interface Testimonial {
  id: string
  icon: string
  rating: number
}

/** A compliance / trust statement rendered on the compliance page. */
export interface ComplianceItem {
  id: string
  icon: string
  titleKey: string
  bodyKey: string
}

/** Generic result envelope returned by service-layer mutations. */
export interface ServiceResult {
  ok: boolean
  /** i18n key describing the error, when `ok` is false. */
  error?: string
}

/** Payload for the contact form. */
export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

/** Active filter state for the inventory list. */
export interface InventoryFilters {
  condition: CarCondition | 'all'
  bodyType: BodyType | 'all'
  fuel: FuelType | 'all'
  sort: 'featured' | 'price-asc' | 'price-desc' | 'year-desc'
  query: string
}
