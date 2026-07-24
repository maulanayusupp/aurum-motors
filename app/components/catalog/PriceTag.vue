<script setup lang="ts">
// Displays a formatted price. `compact` for cards, full for detail pages.
import { useCurrency } from '~/composables/useCurrency'

const props = withDefaults(
  defineProps<{ amount: number; compact?: boolean; size?: 'md' | 'lg' }>(),
  { compact: true, size: 'md' },
)

const { price, priceFull } = useCurrency()
const display = computed(() => (props.compact ? price(props.amount) : priceFull(props.amount)))
</script>

<template>
  <span class="price u-numeric" :class="`price--${size}`">{{ display }}</span>
</template>

<style scoped lang="scss">
.price {
  font-family: $font-display;
  font-weight: 600;
  color: var(--color-gold-soft);
  letter-spacing: 0;

  &--md {
    font-size: 1.5rem;
  }

  &--lg {
    font-size: clamp(2rem, 4vw, 2.8rem);
  }
}
</style>
