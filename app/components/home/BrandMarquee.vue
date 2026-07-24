<script setup lang="ts">
// Infinite marquee of manufacturer names — a premium "brands we carry" strip.
// Duplicated track for a seamless loop; pauses on hover; static on reduced-motion.
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const brands = contentService.getMarqueeBrands()
</script>

<template>
  <section class="marquee" :aria-label="t('home.marquee.label')">
    <div class="marquee__track">
      <ul v-for="copy in 2" :key="copy" class="marquee__list" :aria-hidden="copy === 2 ? 'true' : undefined">
        <li v-for="brand in brands" :key="`${copy}-${brand}`" class="marquee__item">
          {{ brand }}
        </li>
      </ul>
    </div>
    <div class="marquee__fade marquee__fade--left" aria-hidden="true" />
    <div class="marquee__fade marquee__fade--right" aria-hidden="true" />
  </section>
</template>

<style scoped lang="scss">
.marquee {
  position: relative;
  overflow: hidden;
  padding-block: 1.75rem;
  border-block: 1px solid var(--color-hairline);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 32s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    display: flex;
    align-items: center;
    font-family: $font-display;
    font-size: clamp(1.2rem, 2.4vw, 1.7rem);
    font-weight: 500;
    color: var(--color-text-dim);
    white-space: nowrap;
    padding-inline: clamp(1.5rem, 4vw, 3rem);
    transition: color 0.3s $ease-out;

    &::after {
      content: '';
      width: 5px;
      height: 5px;
      margin-left: clamp(3rem, 8vw, 6rem);
      border-radius: 50%;
      background: var(--color-gold);
      opacity: 0.5;
    }

    &:hover {
      color: var(--color-gold-soft);
    }
  }

  &__fade {
    display: none;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
