<script setup lang="ts">
// Customer testimonials. Quotes + author details live in i18n by id. Ratings
// render as gold stars. Kept honest — illustrative testimonials for a demo.
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const items = contentService.getTestimonials()
</script>

<template>
  <section class="section container--wide">
    <SectionHeading
      :eyebrow="t('home.testimonials.eyebrow')"
      :title="t('home.testimonials.title')"
      align="center"
    />
    <div class="wall">
      <RevealOnScroll
        v-for="(item, i) in items"
        :key="item.id"
        as="figure"
        :delay="Math.min(i + 1, 12)"
      >
        <blockquote class="quote">
          <BaseIcon name="quote" :size="26" class="quote__mark" />
          <div class="quote__stars" :aria-label="`${item.rating}/5`">
            <BaseIcon v-for="n in item.rating" :key="n" name="star" :size="15" />
          </div>
          <p class="quote__text">{{ t(`home.testimonials.items.${item.id}.quote`) }}</p>
          <figcaption class="quote__author">
            <span class="quote__name">{{ t(`home.testimonials.items.${item.id}.name`) }}</span>
            <span class="quote__role">{{ t(`home.testimonials.items.${item.id}.role`) }}</span>
          </figcaption>
        </blockquote>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped lang="scss">
.wall {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.quote {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);

  &__mark {
    color: var(--color-gold);
    opacity: 0.5;
  }

  &__stars {
    display: flex;
    gap: 0.15rem;
    color: var(--color-gold);
  }

  &__text {
    flex: 1;
    color: var(--color-text);
    line-height: 1.75;
    font-size: var(--fs-body);
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-hairline);
  }

  &__name {
    font-weight: 700;
  }

  &__role {
    font-size: var(--fs-sm);
    color: var(--color-text-dim);
  }
}
</style>
