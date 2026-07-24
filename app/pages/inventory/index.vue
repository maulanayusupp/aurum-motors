<script setup lang="ts">
// Inventory listing: hero + filter toolbar + responsive grid. Filter state is
// URL-synced via useInventoryFilters, so views are shareable and SSR-friendly.
import { usePageSeo } from '~/composables/usePageSeo'
import { useInventoryFilters } from '~/composables/useInventoryFilters'

const { t } = useI18n()
const { filters, results, facets, activeCount, commit, reset } = useInventoryFilters()

usePageSeo(
  () => t('meta.inventory.title'),
  () => t('meta.inventory.description'),
)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('inventory.eyebrow')"
      :title="t('inventory.title')"
      :lead="t('inventory.lead')"
    />

    <section class="section--tight container--wide">
      <InventoryFilters
        :filters="filters"
        :facets="facets"
        :active-count="activeCount"
        :result-count="results.length"
        @commit="commit"
        @reset="reset"
      />
      <CarGrid :cars="results" :eager-first="3" />
    </section>
  </div>
</template>
