// =============================================================================
// Inventory service — read + query API over the car catalogue. All filtering,
// searching and sorting lives here (not in components), so the UI stays thin
// and this logic is unit-testable and reusable.
// =============================================================================
import { inventory } from '~/config/inventory.config'
import type { Car, InventoryFilters } from '~/types'

/** Default filter state for the inventory page. */
export const defaultFilters: InventoryFilters = {
  condition: 'all',
  bodyType: 'all',
  fuel: 'all',
  sort: 'featured',
  query: '',
}

export const inventoryService = {
  /** All units, source order. */
  getAll(): readonly Car[] {
    return inventory
  },

  /** Hand-picked units for the homepage featured rail. */
  getFeatured(limit = 6): Car[] {
    return inventory.filter((c) => c.featured).slice(0, limit)
  },

  /** A single unit by slug, or undefined. */
  getBySlug(slug: string): Car | undefined {
    return inventory.find((c) => c.slug === slug)
  },

  /** Related units: same body type first, then fill up to `limit`. */
  getRelated(slug: string, limit = 3): Car[] {
    const current = this.getBySlug(slug)
    if (!current) return []
    const sameType = inventory.filter(
      (c) => c.slug !== slug && c.bodyType === current.bodyType,
    )
    const others = inventory.filter(
      (c) => c.slug !== slug && c.bodyType !== current.bodyType,
    )
    return [...sameType, ...others].slice(0, limit)
  },

  /** Apply filters + search + sort. Returns a new array. */
  query(filters: InventoryFilters): Car[] {
    const q = filters.query.trim().toLowerCase()
    let result = inventory.filter((car) => {
      if (filters.condition !== 'all' && car.condition !== filters.condition) return false
      if (filters.bodyType !== 'all' && car.bodyType !== filters.bodyType) return false
      if (filters.fuel !== 'all' && car.fuel !== filters.fuel) return false
      if (q) {
        const haystack = `${car.make} ${car.model} ${car.year}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    result = [...result].sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.priceIdr - b.priceIdr
        case 'price-desc':
          return b.priceIdr - a.priceIdr
        case 'year-desc':
          return b.year - a.year
        case 'featured':
        default:
          return Number(b.featured ?? false) - Number(a.featured ?? false)
      }
    })

    return result
  },

  /** Distinct values available for each filter facet (for building selects). */
  getFacets() {
    return {
      condition: unique(inventory.map((c) => c.condition)),
      bodyType: unique(inventory.map((c) => c.bodyType)),
      fuel: unique(inventory.map((c) => c.fuel)),
    }
  },
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)]
}
