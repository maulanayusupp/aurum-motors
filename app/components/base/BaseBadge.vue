<script setup lang="ts">
// Small status/label pill. `tone` maps to a semantic colour.
withDefaults(
  defineProps<{
    tone?: 'new' | 'used' | 'gold' | 'neutral'
    icon?: string
  }>(),
  { tone: 'neutral' },
)
</script>

<template>
  <span class="badge" :class="`badge--${tone}`">
    <BaseIcon v-if="icon" :name="icon" :size="13" />
    <slot />
  </span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
  font-size: var(--fs-eyebrow);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid transparent;
  line-height: 1;

  &--new {
    color: var(--color-new);
    background: rgba(111, 208, 140, 0.1);
    border-color: rgba(111, 208, 140, 0.3);
  }

  &--used {
    color: var(--color-used);
    background: rgba(217, 185, 118, 0.1);
    border-color: rgba(217, 185, 118, 0.3);
  }

  &--gold {
    color: var(--color-on-gold);
    background: var(--color-gold);
  }

  &--neutral {
    color: var(--color-text-muted);
    background: var(--color-surface-2);
    border-color: var(--color-border);
  }
}
</style>
