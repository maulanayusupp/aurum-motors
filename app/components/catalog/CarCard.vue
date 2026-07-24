<script setup lang="ts">
// Inventory card: pointer-tilt, image with condition badge, key specs, price,
// and links to the detail page. Interactive yet accessible (whole card is a
// link via a stretched overlay; the WhatsApp CTA is a separate link).
import { useCurrency } from '~/composables/useCurrency'
import { useTilt } from '~/composables/useTilt'
import type { Car } from '~/types'
import { carInquiryLink } from '~/services/whatsapp.service'

const props = withDefaults(
  defineProps<{ car: Car; eager?: boolean }>(),
  { eager: false },
)

const { t } = useI18n()
const localePath = useLocalePath()
const { number } = useCurrency()
const { el, onMove, reset } = useTilt(5)

const detailPath = computed(() => localePath(`/inventory/${props.car.slug}`))
const conditionLabel = computed(() => t(`condition.${props.car.condition}`))

const quickSpecs = computed(() => [
  { icon: 'calendar', value: String(props.car.year) },
  {
    icon: 'road',
    value: props.car.mileageKm === 0 ? t('car.brandNew') : `${number(props.car.mileageKm)} km`,
  },
  { icon: 'bolt', value: `${props.car.horsepower} hp` },
])

const inquiryLink = computed(() =>
  carInquiryLink(props.car, t('whatsapp.carInquiry')),
)
</script>

<template>
  <article
    ref="el"
    class="card"
    @pointermove="onMove"
    @pointerleave="reset"
  >
    <div class="card__media">
      <img
        :src="car.image"
        :alt="`${car.make} ${car.model} ${car.year}`"
        class="card__img"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        width="1400"
        height="933"
      />
      <div class="card__badges">
        <BaseBadge :tone="car.condition === 'new' ? 'new' : 'used'">
          {{ conditionLabel }}
        </BaseBadge>
        <BaseBadge tone="neutral">{{ t(`body.${car.bodyType}`) }}</BaseBadge>
      </div>
      <div class="card__sheen" aria-hidden="true" />
    </div>

    <div class="card__body">
      <p class="card__make">{{ car.make }}</p>
      <h3 class="card__model">
        <NuxtLink :to="detailPath" class="card__link">{{ car.model }}</NuxtLink>
      </h3>

      <ul class="card__specs">
        <li v-for="(spec, i) in quickSpecs" :key="i" class="card__spec">
          <BaseIcon :name="spec.icon" :size="15" />
          <span class="u-numeric">{{ spec.value }}</span>
        </li>
      </ul>

      <div class="card__footer">
        <PriceTag :amount="car.priceIdr" />
        <span class="card__cta">
          {{ t('car.viewDetail') }}
          <BaseIcon name="arrow-right" :size="16" />
        </span>
      </div>

      <a
        :href="inquiryLink"
        target="_blank"
        rel="noopener noreferrer"
        class="card__wa"
        @click.stop
      >
        <BaseIcon name="whatsapp" :size="16" />
        {{ t('car.askWhatsApp') }}
      </a>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transform: perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transform-style: preserve-3d;
  transition: transform 0.4s $ease-out, border-color 0.4s $ease-out, box-shadow 0.4s $ease-out;

  &:hover {
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-lg);
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $ease-out;
  }

  &:hover &__img {
    transform: scale(1.06);
  }

  &__badges {
    position: absolute;
    top: 0.9rem;
    left: 0.9rem;
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  &__sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 11, 13, 0.85) 0%, transparent 45%);
    pointer-events: none;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 1.25rem 1.3rem 1.4rem;
  }

  &__make {
    font-size: var(--fs-eyebrow);
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-gold);
  }

  &__model {
    font-family: $font-display;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.15;
  }

  &__link {
    // Stretch the primary link across the whole card for a large hit target.
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }

  &__specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1rem;
    margin: 0.35rem 0 0.4rem;
  }

  &__spec {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--fs-sm);
    color: var(--color-text-muted);

    :deep(.icon) {
      color: var(--color-gold);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--color-hairline);
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    transition: color 0.25s $ease-out, gap 0.25s $ease-out;
  }

  &:hover &__cta {
    color: var(--color-gold);
    gap: 0.6rem;
  }

  &__wa {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 0.9rem;
    padding: 0.6rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    transition: color 0.25s $ease-out, border-color 0.25s, background 0.25s;
    @include focus-ring;

    :deep(.icon) {
      color: #25d366;
    }

    &:hover {
      color: var(--color-text);
      border-color: rgba(37, 211, 102, 0.4);
      background: rgba(37, 211, 102, 0.06);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transform: none !important;
  }
}
</style>
