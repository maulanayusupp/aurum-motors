<script setup lang="ts">
// Compact hero used on inner pages (about, contact, legal, inventory).
// Editorial: eyebrow + big serif title + lead, over the ambient background.
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
  }>(),
  {},
)
</script>

<template>
  <section class="pagehero">
    <div class="pagehero__inner container">
      <span v-if="eyebrow" class="u-eyebrow">{{ eyebrow }}</span>
      <h1 class="pagehero__title">{{ title }}</h1>
      <p v-if="lead" class="pagehero__lead u-lead">{{ lead }}</p>
      <div v-if="$slots.default" class="pagehero__extra">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.pagehero {
  position: relative;
  padding-block: clamp(3.5rem, 9vw, 6.5rem) clamp(2rem, 4vw, 3rem);

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    max-width: 52rem;
  }

  &__title {
    font-size: var(--fs-h1);
  }

  &__lead {
    max-width: 42rem;
  }

  &__extra {
    margin-top: 0.75rem;
  }
}
</style>
