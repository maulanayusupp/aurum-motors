<script setup lang="ts">
// Standard section header: eyebrow kicker + title + optional lead. `align`
// controls text alignment; slot allows a trailing action (e.g. "view all").
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
    align?: 'left' | 'center'
    as?: string
  }>(),
  { align: 'left', as: 'h2' },
)
</script>

<template>
  <div class="heading" :class="`heading--${align}`">
    <div class="heading__text">
      <span v-if="eyebrow" class="u-eyebrow">{{ eyebrow }}</span>
      <component :is="as" class="heading__title">
        <slot name="title">{{ title }}</slot>
      </component>
      <p v-if="lead" class="heading__lead u-lead">{{ lead }}</p>
    </div>
    <div v-if="$slots.action" class="heading__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    max-width: 46rem;
  }

  &__title {
    font-size: var(--fs-h2);
  }

  &--center {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .heading__text {
      align-items: center;
    }
  }
}
</style>
