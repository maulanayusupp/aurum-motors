<script setup lang="ts">
// The buying journey as four numbered steps, connected by a gold rail. Copy in
// i18n; structure in contentService.
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const steps = contentService.getProcessSteps()
</script>

<template>
  <section class="section">
    <div class="container--wide">
      <SectionHeading
        :eyebrow="t('home.process.eyebrow')"
        :title="t('home.process.title')"
        :lead="t('home.process.lead')"
      />
      <ol class="steps">
        <RevealOnScroll
          v-for="(step, i) in steps"
          :key="step.id"
          as="li"
          :delay="Math.min(i + 1, 12)"
        >
          <div class="step">
            <div class="step__top">
              <span class="step__num u-numeric">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="step__icon"><BaseIcon :name="step.icon" :size="20" /></span>
            </div>
            <h3 class="step__title">{{ t(step.titleKey) }}</h3>
            <p class="step__body">{{ t(step.bodyKey) }}</p>
          </div>
        </RevealOnScroll>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  counter-reset: step;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.6rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-surface-2), var(--color-surface));
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-gold), transparent);
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__num {
    font-family: $font-display;
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--color-gold);
    opacity: 0.35;
    line-height: 1;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    color: var(--color-gold);
    background: rgba(201, 162, 75, 0.08);
    border: 1px solid var(--color-border);
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
