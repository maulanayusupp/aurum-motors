<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error?.statusCode === 404)
const code = computed(() => props.error?.statusCode ?? 500)

const handleHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="error">
    <div class="error__glow" aria-hidden="true" />
    <div class="error__inner container">
      <p class="error__code u-numeric">{{ code }}</p>
      <h1 class="error__title">
        {{ isNotFound ? t('error.notFound.title') : t('error.generic.title') }}
      </h1>
      <p class="error__body u-lead">
        {{ isNotFound ? t('error.notFound.body') : t('error.generic.body') }}
      </p>
      <div class="error__actions">
        <BaseButton variant="primary" icon-right="arrow-right" @click="handleHome">
          {{ t('error.backHome') }}
        </BaseButton>
        <BaseButton :to="localePath('/inventory')" variant="ghost">
          {{ t('error.browse') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100dvh;
  overflow: hidden;
  text-align: center;

  &__glow {
    position: absolute;
    inset: auto 0 20% 0;
    height: 40rem;
    background: radial-gradient(ellipse at center, var(--color-gold-glow), transparent 62%);
    filter: blur(20px);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  &__code {
    font-family: $font-display;
    font-size: clamp(5rem, 22vw, 13rem);
    line-height: 0.9;
    @include gold-text;
  }

  &__title {
    font-size: var(--fs-h2);
  }

  &__body {
    max-width: 34rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    justify-content: center;
    margin-top: var(--space-3);
  }
}
</style>
