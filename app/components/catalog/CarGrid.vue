<script setup lang="ts">
// Responsive grid of CarCards with a staggered scroll-reveal. Shows an empty
// state when no cars match the current filters.
import type { Car } from '~/types'

withDefaults(
  defineProps<{ cars: readonly Car[]; eagerFirst?: number }>(),
  { eagerFirst: 0 },
)

const { t } = useI18n()
</script>

<template>
  <div>
    <div v-if="cars.length" class="grid">
      <RevealOnScroll
        v-for="(car, i) in cars"
        :key="car.slug"
        :delay="Math.min((i % 3) + 1, 12)"
      >
        <CarCard :car="car" :eager="i < eagerFirst" />
      </RevealOnScroll>
    </div>

    <div v-else class="empty">
      <BaseIcon name="search" :size="40" />
      <h3 class="empty__title">{{ t('inventory.empty.title') }}</h3>
      <p class="empty__body">{{ t('inventory.empty.body') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 2.5vw, 2rem);

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: clamp(3rem, 8vw, 6rem) 1rem;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-dim);

  :deep(.icon) {
    color: var(--color-gold);
    opacity: 0.7;
  }

  &__title {
    font-family: $font-display;
    font-size: var(--fs-h4);
    color: var(--color-text);
  }

  &__body {
    color: var(--color-text-muted);
    max-width: 24rem;
  }
}
</style>
