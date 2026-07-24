<script setup lang="ts">
// Filter + sort toolbar for the inventory page. Binds to the reactive filter
// object from `useInventoryFilters` and emits `commit` (persist to URL) on any
// change and `reset` to clear. Collapsible on mobile.
import type { InventoryFilters } from '~/types'

const props = defineProps<{
  filters: InventoryFilters
  facets: { condition: string[]; bodyType: string[]; fuel: string[] }
  activeCount: number
  resultCount: number
}>()

const emit = defineEmits<{ commit: []; reset: [] }>()
const { t } = useI18n()
const open = ref(false)

const allOption = (labelKey: string) => ({ value: 'all', label: t(labelKey) })

const conditionOptions = computed(() => [
  allOption('inventory.filters.allConditions'),
  ...props.facets.condition.map((v) => ({ value: v, label: t(`condition.${v}`) })),
])
const bodyOptions = computed(() => [
  allOption('inventory.filters.allBodies'),
  ...props.facets.bodyType.map((v) => ({ value: v, label: t(`body.${v}`) })),
])
const fuelOptions = computed(() => [
  allOption('inventory.filters.allFuels'),
  ...props.facets.fuel.map((v) => ({ value: v, label: t(`fuel.${v}`) })),
])
const sortOptions = computed(() => [
  { value: 'featured', label: t('inventory.sort.featured') },
  { value: 'price-asc', label: t('inventory.sort.priceAsc') },
  { value: 'price-desc', label: t('inventory.sort.priceDesc') },
  { value: 'year-desc', label: t('inventory.sort.yearDesc') },
])

const onChange = () => emit('commit')
</script>

<template>
  <div class="filters">
    <div class="filters__topbar">
      <label class="filters__search">
        <BaseIcon name="search" :size="18" class="filters__search-icon" />
        <input
          :value="filters.query"
          type="search"
          class="filters__search-input"
          :placeholder="t('inventory.filters.searchPlaceholder')"
          :aria-label="t('inventory.filters.searchPlaceholder')"
          @input="filters.query = ($event.target as HTMLInputElement).value; onChange()"
        />
      </label>

      <button
        class="filters__toggle"
        :aria-expanded="open"
        @click="open = !open"
      >
        <BaseIcon name="filter" :size="17" />
        {{ t('inventory.filters.title') }}
        <span v-if="activeCount" class="filters__count">{{ activeCount }}</span>
      </button>

      <p class="filters__result u-numeric">
        {{ t('inventory.resultsCount', { count: resultCount }) }}
      </p>
    </div>

    <div class="filters__panel" :class="{ 'is-open': open }">
      <BaseSelect
        v-model="filters.condition"
        :label="t('inventory.filters.condition')"
        :options="conditionOptions"
        icon="sparkles"
        @update:model-value="onChange"
      />
      <BaseSelect
        v-model="filters.bodyType"
        :label="t('inventory.filters.body')"
        :options="bodyOptions"
        icon="key"
        @update:model-value="onChange"
      />
      <BaseSelect
        v-model="filters.fuel"
        :label="t('inventory.filters.fuel')"
        :options="fuelOptions"
        icon="fuel"
        @update:model-value="onChange"
      />
      <BaseSelect
        v-model="filters.sort"
        :label="t('inventory.filters.sortBy')"
        :options="sortOptions"
        icon="filter"
        @update:model-value="onChange"
      />
      <div class="filters__reset">
        <BaseButton
          v-if="activeCount"
          variant="ghost"
          size="sm"
          icon-left="close"
          @click="emit('reset')"
        >
          {{ t('inventory.filters.reset') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

  &__topbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
  }

  &__search {
    position: relative;
    flex: 1 1 16rem;
    display: flex;
    align-items: center;
  }

  &__search-icon {
    position: absolute;
    left: 1rem;
    color: var(--color-text-dim);
    pointer-events: none;
  }

  &__search-input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.85rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-pill);
    color: var(--color-text);
    font-size: var(--fs-sm);
    transition: border-color 0.2s $ease-out;
    @include focus-ring;

    &::placeholder {
      color: var(--color-text-dim);
    }

    &:hover,
    &:focus {
      border-color: var(--color-border-strong);
    }
  }

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    font-weight: 600;
    font-size: var(--fs-sm);
    color: var(--color-text);
    @include focus-ring;

    @include respond-to('lg') {
      display: none;
    }
  }

  &__count {
    display: grid;
    place-items: center;
    min-width: 1.3rem;
    height: 1.3rem;
    padding-inline: 0.35rem;
    border-radius: var(--radius-pill);
    background: var(--color-gold);
    color: var(--color-on-gold);
    font-size: 0.72rem;
    font-weight: 800;
  }

  &__result {
    margin-left: auto;
    font-size: var(--fs-sm);
    color: var(--color-text-dim);
  }

  &__panel {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.25rem;
    padding: 1.25rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-bg-2);

    // Collapsed on mobile until toggled.
    display: none;

    &.is-open {
      display: grid;
    }

    @include respond-to('lg') {
      display: grid;
      grid-template-columns: repeat(4, 1fr) auto;
      align-items: end;
    }
  }

  &__reset {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;

    @include respond-to('lg') {
      grid-column: auto;
    }
  }
}
</style>
