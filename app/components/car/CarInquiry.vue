<script setup lang="ts">
// Sticky purchase/inquiry panel on the detail page. Price + condition + the
// primary WhatsApp handoff (prefilled with this car) and a call fallback.
import { brandConfig } from '~/config/brand.config'
import { useCurrency } from '~/composables/useCurrency'
import type { Car } from '~/types'
import { carInquiryLink } from '~/services/whatsapp.service'

const props = defineProps<{ car: Car }>()
const { t, locale } = useI18n()
const { priceFull } = useCurrency()
const site = useSiteConfig()
const localePath = useLocalePath()

const url = computed(() => `${site.url}${localePath(`/inventory/${props.car.slug}`)}`)
const waLink = computed(() =>
  carInquiryLink(props.car, t('whatsapp.carInquiry'), {
    locale: locale.value,
    url: url.value,
  }),
)
const telLink = `tel:+${brandConfig.whatsapp}`
</script>

<template>
  <aside class="inquiry">
    <div class="inquiry__head">
      <BaseBadge :tone="car.condition === 'new' ? 'new' : 'used'">
        {{ t(`condition.${car.condition}`) }}
      </BaseBadge>
      <span class="inquiry__label">{{ t('car.priceLabel') }}</span>
    </div>

    <PriceTag :amount="car.priceIdr" :compact="false" size="lg" />
    <p class="inquiry__note">{{ t('car.priceNote') }}</p>

    <BaseButton
      :href="waLink"
      target="_blank"
      variant="primary"
      block
      size="lg"
      icon-left="whatsapp"
    >
      {{ t('car.inquiryCta') }}
    </BaseButton>
    <BaseButton :href="telLink" variant="gold-outline" block icon-left="phone">
      {{ t('car.callCta') }}
    </BaseButton>

    <div class="inquiry__agent">
      <span class="inquiry__agent-avatar" aria-hidden="true">
        <BaseIcon name="user" :size="20" />
      </span>
      <div>
        <p class="inquiry__agent-name">{{ brandConfig.contactName }}</p>
        <p class="inquiry__agent-role">{{ t('car.salesConsultant') }}</p>
      </div>
    </div>

    <ul class="inquiry__assurances">
      <li><BaseIcon name="check" :size="15" /> {{ t('car.assurance.inspected') }}</li>
      <li><BaseIcon name="check" :size="15" /> {{ t('car.assurance.documents') }}</li>
      <li><BaseIcon name="check" :size="15" /> {{ t('car.assurance.testDrive') }}</li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.inquiry {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-strong);
  background: linear-gradient(180deg, var(--color-surface-2), var(--color-surface));
  box-shadow: var(--shadow-md);

  @include respond-to('lg') {
    position: sticky;
    top: calc(var(--header-h) + 1.5rem);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: var(--fs-eyebrow);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  &__note {
    font-size: var(--fs-sm);
    color: var(--color-text-muted);
    margin-bottom: 0.4rem;
  }

  &__agent {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.4rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-hairline);
  }

  &__agent-avatar {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--color-elevated);
    color: var(--color-gold);
    border: 1px solid var(--color-border);
  }

  &__agent-name {
    font-weight: 700;
    font-size: var(--fs-sm);
  }

  &__agent-role {
    font-size: var(--fs-eyebrow);
    color: var(--color-text-dim);
  }

  &__assurances {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.4rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--fs-sm);
      color: var(--color-text-muted);

      :deep(.icon) {
        color: var(--color-success);
      }
    }
  }
}
</style>
