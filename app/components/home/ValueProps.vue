<script setup lang="ts">
// "Why AURUM" — value proposition grid. Structure from contentService, copy
// from i18n. Each tile reveals on scroll with a stagger.
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const items = contentService.getValueProps()
</script>

<template>
  <section class="section container--wide">
    <SectionHeading
      :eyebrow="t('home.value.eyebrow')"
      :title="t('home.value.title')"
      :lead="t('home.value.lead')"
      align="center"
    />
    <div class="values">
      <RevealOnScroll
        v-for="(item, i) in items"
        :key="item.id"
        as="article"
        :delay="Math.min(i + 1, 12)"
      >
        <div class="value">
          <span class="value__icon">
            <BaseIcon :name="item.icon" :size="24" />
          </span>
          <h3 class="value__title">{{ t(item.titleKey) }}</h3>
          <p class="value__body">{{ t(item.bodyKey) }}</p>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped lang="scss">
.values {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.value {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.35s $ease-out, transform 0.35s $ease-out, background 0.35s;

  &:hover {
    border-color: var(--color-border-strong);
    transform: translateY(-4px);
    background: var(--color-surface-2);
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: var(--radius-md);
    color: var(--color-gold);
    background: rgba(201, 162, 75, 0.1);
    border: 1px solid var(--color-border-strong);
  }

  &__title {
    font-family: $font-sans;
    font-size: var(--fs-lg);
    font-weight: 700;
  }

  &__body {
    color: var(--color-text-muted);
    font-size: var(--fs-sm);
    line-height: 1.7;
  }
}
</style>
