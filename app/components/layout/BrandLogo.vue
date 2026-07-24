<script setup lang="ts">
// Wordmark logo lockup: a minimal gold monogram mark + the brand name set in
// the editorial display face. Pure SVG mark (no raster dependency).
import { brandConfig } from '~/config/brand.config'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <span class="logo" :class="{ 'logo--compact': compact }">
    <span class="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="34" height="34">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e7cf9b" />
            <stop offset="100%" stop-color="#9c7a2f" />
          </linearGradient>
        </defs>
        <path
          d="M20 4 34 34 H27 L20 18 13 34 H6 Z"
          fill="none"
          stroke="url(#logoGrad)"
          stroke-width="2.4"
          stroke-linejoin="round"
        />
        <circle cx="20" cy="27" r="2.4" fill="url(#logoGrad)" />
      </svg>
    </span>
    <span v-if="!compact" class="logo__word">{{ brandConfig.name }}</span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &__mark {
    display: grid;
    place-items: center;
    filter: drop-shadow(0 3px 10px var(--color-gold-glow));
    transition: transform 0.4s $ease-spring;
  }

  &:hover &__mark {
    transform: rotate(-6deg) scale(1.06);
  }

  &__word {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: var(--color-text);
  }
}
</style>
