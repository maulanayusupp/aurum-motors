<script setup lang="ts">
// Renders a legal/compliance document from an i18n message array. Each section
// has a `heading` and one or more `paragraphs`. Keeps privacy/terms DRY.
interface LegalSection {
  heading: string
  paragraphs: string[]
}

defineProps<{
  sections: LegalSection[]
  updated: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="legal container">
    <p class="legal__updated">
      <BaseIcon name="clock" :size="15" />
      {{ t('legal.lastUpdated') }}: {{ updated }}
    </p>
    <article class="legal__doc">
      <section v-for="(section, i) in sections" :key="i" class="legal__section">
        <h2 class="legal__heading">
          <span class="legal__num u-numeric">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ section.heading }}
        </h2>
        <p v-for="(p, j) in section.paragraphs" :key="j" class="legal__p">{{ p }}</p>
      </section>
    </article>
  </div>
</template>

<style scoped lang="scss">
.legal {
  max-width: 56rem;
  padding-bottom: var(--space-8);

  &__updated {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--fs-sm);
    color: var(--color-text-dim);
    margin-bottom: 2.5rem;

    :deep(.icon) {
      color: var(--color-gold);
    }
  }

  &__section {
    padding-block: 1.75rem;
    border-top: 1px solid var(--color-hairline);

    &:first-child {
      border-top: none;
      padding-top: 0;
    }
  }

  &__heading {
    display: flex;
    align-items: baseline;
    gap: 0.85rem;
    font-family: $font-sans;
    font-size: var(--fs-h4);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__num {
    color: var(--color-gold);
    font-size: 0.85rem;
    font-weight: 800;
  }

  &__p {
    color: var(--color-text-muted);
    line-height: 1.8;
    margin-bottom: 0.9rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
