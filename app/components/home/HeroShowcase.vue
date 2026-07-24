<script setup lang="ts">
// Homepage hero: editorial split layout — oversized serif headline with a gold
// flourish, dual CTAs, and a featured car image with a subtle pointer parallax
// and floating price chip. This is the first "wow" moment; kept accessible and
// reduced-motion friendly.
import { useCurrency } from '~/composables/useCurrency'
import { useTilt } from '~/composables/useTilt'
import { inventoryService } from '~/services/inventory.service'
import { whatsappLink } from '~/services/whatsapp.service'

const { t } = useI18n()
const localePath = useLocalePath()
const { price } = useCurrency()
const { el, onMove, reset } = useTilt(4)

// Spotlight one hero unit (first featured). Falls back to the static hero image.
const spotlight = inventoryService.getFeatured(1)[0]
const spotlightPath = computed(() =>
  spotlight ? localePath(`/inventory/${spotlight.slug}`) : localePath('/inventory'),
)
const waLink = computed(() => whatsappLink(t('whatsapp.generic')))
</script>

<template>
  <section class="hero">
    <div class="hero__inner container--wide">
      <div class="hero__copy">
        <span class="u-eyebrow">{{ t('home.hero.eyebrow') }}</span>
        <h1 class="hero__title">
          {{ t('home.hero.titleLine1') }}
          <span class="u-gold">{{ t('home.hero.titleAccent') }}</span>
          {{ t('home.hero.titleLine2') }}
        </h1>
        <p class="hero__lead u-lead">{{ t('home.hero.lead') }}</p>

        <div class="hero__actions">
          <BaseButton :to="localePath('/inventory')" variant="primary" size="lg" icon-right="arrow-right">
            {{ t('home.hero.ctaPrimary') }}
          </BaseButton>
          <BaseButton :href="waLink" target="_blank" variant="gold-outline" size="lg" icon-left="whatsapp">
            {{ t('home.hero.ctaSecondary') }}
          </BaseButton>
        </div>

        <dl class="hero__stats">
          <div class="hero__stat">
            <dt class="hero__stat-value u-numeric">12</dt>
            <dd class="hero__stat-label">{{ t('home.hero.stat.units') }}</dd>
          </div>
          <div class="hero__stat">
            <dt class="hero__stat-value u-numeric">8</dt>
            <dd class="hero__stat-label">{{ t('home.hero.stat.brands') }}</dd>
          </div>
          <div class="hero__stat">
            <dt class="hero__stat-value">100%</dt>
            <dd class="hero__stat-label">{{ t('home.hero.stat.documents') }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero__stage" @pointermove="onMove" @pointerleave="reset">
        <div ref="el" class="hero__card">
          <NuxtLink :to="spotlightPath" class="hero__media">
            <img
              :src="spotlight?.image ?? '/cars/hero-ferrari.jpg'"
              :alt="spotlight ? `${spotlight.make} ${spotlight.model}` : 'AURUM'"
              class="hero__img"
              width="1400"
              height="933"
              fetchpriority="high"
            />
            <div class="hero__gradient" aria-hidden="true" />
          </NuxtLink>

          <div v-if="spotlight" class="hero__chip">
            <span class="hero__chip-label">{{ t('home.hero.spotlight') }}</span>
            <span class="hero__chip-name">{{ spotlight.make }} {{ spotlight.model }}</span>
            <span class="hero__chip-price u-numeric">{{ price(spotlight.priceIdr) }}</span>
          </div>
        </div>
        <div class="hero__glow" aria-hidden="true" />
      </div>
    </div>
    <hr class="hairline" />
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  padding-top: clamp(2.5rem, 6vw, 5rem);

  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2.5rem, 5vw, 4rem);
    align-items: center;
    padding-bottom: clamp(3rem, 6vw, 5rem);

    @include respond-to('lg') {
      grid-template-columns: 1.02fr 1fr;
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    max-width: 40rem;
  }

  &__title {
    font-size: var(--fs-h1);
    line-height: 1.02;
  }

  &__lead {
    max-width: 34rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 0.4rem;
  }

  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 2.25rem;
    margin-top: 1.5rem;
    padding-top: 1.75rem;
    border-top: 1px solid var(--color-hairline);
  }

  &__stat-value {
    font-family: $font-display;
    font-size: 2.1rem;
    font-weight: 700;
    color: var(--color-gold-soft);
    line-height: 1;
  }

  &__stat-label {
    margin-top: 0.35rem;
    font-size: var(--fs-eyebrow);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  // — Stage / featured card —
  &__stage {
    position: relative;
    perspective: 1200px;
  }

  &__card {
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    position: relative;
    z-index: 2;
    transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
    transform-style: preserve-3d;
    transition: transform 0.4s $ease-out;
  }

  &__media {
    display: block;
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--color-border-strong);
    box-shadow: var(--shadow-lg);
    @include focus-ring;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 11, 13, 0.7), transparent 55%);
  }

  &__chip {
    position: absolute;
    left: 1.25rem;
    bottom: 1.25rem;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.9rem 1.2rem;
    border-radius: var(--radius-md);
    transform: translateZ(40px);
    @include glass(rgba(14, 16, 19, 0.82));

    &-label {
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-gold);
    }

    &-name {
      font-family: $font-display;
      font-weight: 600;
      font-size: 1.05rem;
    }

    &-price {
      font-size: var(--fs-sm);
      color: var(--color-text-muted);
    }
  }

  &__glow {
    position: absolute;
    inset: 8% 4% -12% 8%;
    z-index: 1;
    background: radial-gradient(ellipse at 60% 60%, var(--color-gold-glow), transparent 65%);
    filter: blur(28px);
    pointer-events: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__card {
    transform: none !important;
  }
}
</style>
