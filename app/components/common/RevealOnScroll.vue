<script setup lang="ts">
// Wraps content in a scroll-reveal container. `as` picks the element/tag and
// `delay` (1–12) applies a staggered transition-delay utility class.
import { useReveal } from '~/composables/useReveal'

withDefaults(defineProps<{ as?: string; delay?: number }>(), { as: 'div', delay: 0 })
const { el } = useReveal()
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="delay ? `reveal-${delay}` : undefined"
  >
    <slot />
  </component>
</template>
