<script setup lang="ts">
// Car detail (product) page: gallery + sticky inquiry panel, description,
// highlights, full specs, and related units. 404s cleanly on unknown slug.
// Adds Product JSON-LD for rich results.
import { usePageSeo } from '~/composables/usePageSeo'
import { useCurrency } from '~/composables/useCurrency'
import { inventoryService } from '~/services/inventory.service'
import { carSocialImage } from '~/utils/format'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()
const { priceFull } = useCurrency()

const slug = computed(() => String(route.params.slug))
const car = computed(() => inventoryService.getBySlug(slug.value))

if (!car.value) {
  throw createError({ statusCode: 404, statusMessage: 'Car not found', fatal: true })
}

const current = car.value!
const related = inventoryService.getRelated(slug.value, 3)

const title = computed(() => `${current.make} ${current.model} ${current.year}`)
const description = computed(() => t(`cars.${current.slug}.tagline`))
const featureList = computed(() => current.featureKeys.map((k) => t(k)))

usePageSeo(title, description, {
  image: () => carSocialImage(current.image),
  type: 'product',
})

// Product structured data (JSON-LD).
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Car',
          name: title.value,
          brand: { '@type': 'Brand', name: current.make },
          model: current.model,
          vehicleModelDate: String(current.year),
          image: `${site.url}${current.image}`,
          description: description.value,
          mileageFromOdometer: { '@type': 'QuantitativeValue', value: current.mileageKm, unitCode: 'KMT' },
          offers: {
            '@type': 'Offer',
            price: current.priceIdr,
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
            itemCondition:
              current.condition === 'new'
                ? 'https://schema.org/NewCondition'
                : 'https://schema.org/UsedCondition',
          },
        }),
      ),
    },
  ],
})
</script>

<template>
  <div v-if="car" class="detail">
    <div class="detail__top container--wide">
      <NuxtLink :to="localePath('/inventory')" class="detail__back">
        <BaseIcon name="arrow-left" :size="16" />
        {{ t('car.backToInventory') }}
      </NuxtLink>
    </div>

    <div class="detail__grid container--wide">
      <div class="detail__main">
        <CarGallery :images="current.gallery" :alt="title" />

        <div class="detail__intro">
          <p class="detail__make">{{ current.make }}</p>
          <h1 class="detail__title">{{ current.model }}</h1>
          <p class="detail__tagline u-lead">{{ description }}</p>
        </div>

        <section class="detail__block">
          <h2 class="detail__block-title">{{ t('car.overview') }}</h2>
          <p class="detail__desc">{{ t(`cars.${current.slug}.description`) }}</p>
        </section>

        <section class="detail__block">
          <h2 class="detail__block-title">{{ t('car.specifications') }}</h2>
          <CarSpecs :car="current" />
        </section>

        <section class="detail__block">
          <h2 class="detail__block-title">{{ t('car.highlights') }}</h2>
          <ul class="detail__features">
            <li v-for="(feature, i) in featureList" :key="i" class="detail__feature">
              <BaseIcon name="check-circle" :size="18" />
              {{ feature }}
            </li>
          </ul>
        </section>
      </div>

      <div class="detail__aside">
        <CarInquiry :car="current" />
      </div>
    </div>

    <section v-if="related.length" class="section container--wide">
      <SectionHeading :eyebrow="t('car.relatedEyebrow')" :title="t('car.relatedTitle')" />
      <CarGrid :cars="related" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.detail {
  &__top {
    padding-top: clamp(1.5rem, 4vw, 2.5rem);
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    transition: color 0.2s $ease-out, gap 0.2s $ease-out;
    @include focus-ring(var(--color-gold), 2px);

    &:hover {
      color: var(--color-gold);
      gap: 0.65rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 4vw, 3.5rem);
    padding-top: 1.5rem;

    @include respond-to('lg') {
      grid-template-columns: 1.6fr 1fr;
      align-items: start;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: clamp(1.75rem, 4vw, 2.75rem);
    min-width: 0;
  }

  &__intro {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__make {
    font-size: var(--fs-eyebrow);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-gold);
  }

  &__title {
    font-size: var(--fs-h1);
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__block-title {
    font-family: $font-sans;
    font-size: var(--fs-h4);
    font-weight: 700;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-hairline);
  }

  &__desc {
    color: var(--color-text-muted);
    line-height: 1.85;
    font-size: var(--fs-lg);
  }

  &__features {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    font-size: var(--fs-sm);

    :deep(.icon) {
      color: var(--color-gold);
      flex-shrink: 0;
    }
  }
}
</style>
