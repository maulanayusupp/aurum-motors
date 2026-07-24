// =============================================================================
// Inventory filter state, synced to the URL query string so filtered views are
// shareable and survive refresh/back-navigation. Delegates the actual querying
// to `inventoryService` (single source of filter logic).
// =============================================================================
import { defaultFilters, inventoryService } from '~/services/inventory.service'
import type {
  BodyType,
  CarCondition,
  FuelType,
  InventoryFilters,
} from '~/types'

export const useInventoryFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<InventoryFilters>({ ...defaultFilters })

  /** Hydrate filter state from the current URL query. */
  const syncFromRoute = () => {
    const q = route.query
    filters.condition = (asString(q.condition) as CarCondition) || 'all'
    filters.bodyType = (asString(q.body) as BodyType) || 'all'
    filters.fuel = (asString(q.fuel) as FuelType) || 'all'
    filters.sort = (asString(q.sort) as InventoryFilters['sort']) || 'featured'
    filters.query = asString(q.q)
  }

  syncFromRoute()
  watch(() => route.query, syncFromRoute)

  /** Push current filter state back into the URL (omitting defaults). */
  const commit = () => {
    const query: Record<string, string> = {}
    if (filters.condition !== 'all') query.condition = filters.condition
    if (filters.bodyType !== 'all') query.body = filters.bodyType
    if (filters.fuel !== 'all') query.fuel = filters.fuel
    if (filters.sort !== 'featured') query.sort = filters.sort
    if (filters.query.trim()) query.q = filters.query.trim()
    router.replace({ query })
  }

  const reset = () => {
    Object.assign(filters, defaultFilters)
    router.replace({ query: {} })
  }

  const results = computed(() => inventoryService.query(filters))
  const facets = inventoryService.getFacets()
  const activeCount = computed(() => {
    let n = 0
    if (filters.condition !== 'all') n++
    if (filters.bodyType !== 'all') n++
    if (filters.fuel !== 'all') n++
    if (filters.query.trim()) n++
    return n
  })

  return { filters, results, facets, activeCount, commit, reset }
}

function asString(value: unknown): string {
  if (Array.isArray(value)) return String(value[0] ?? '')
  return value == null ? '' : String(value)
}
