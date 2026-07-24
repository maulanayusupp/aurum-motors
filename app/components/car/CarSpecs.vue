<script setup lang="ts">
// Specification grid for the detail page. Builds labelled tiles from the car's
// hard facts, formatting numbers via useCurrency and labels/values via i18n.
import { useCurrency } from '~/composables/useCurrency'
import type { Car } from '~/types'
import { specIcons } from '~/utils/iconPaths'

const props = defineProps<{ car: Car }>()
const { t } = useI18n()
const { number } = useCurrency()

const specs = computed(() => [
  { icon: specIcons.year, label: t('car.specs.year'), value: String(props.car.year) },
  {
    icon: specIcons.mileage,
    label: t('car.specs.mileage'),
    value: props.car.mileageKm === 0 ? t('car.brandNew') : `${number(props.car.mileageKm)} km`,
  },
  { icon: specIcons.power, label: t('car.specs.power'), value: `${props.car.horsepower} hp` },
  { icon: specIcons.acceleration, label: t('car.specs.acceleration'), value: `${props.car.acceleration}s` },
  { icon: specIcons.fuel, label: t('car.specs.fuel'), value: t(`fuel.${props.car.fuel}`) },
  { icon: specIcons.transmission, label: t('car.specs.transmission'), value: t(`transmission.${props.car.transmission}`) },
  { icon: specIcons.seats, label: t('car.specs.seats'), value: String(props.car.seats) },
  { icon: specIcons.color, label: t('car.specs.color'), value: t(props.car.colorKey) },
])
</script>

<template>
  <dl class="specs">
    <div v-for="(spec, i) in specs" :key="i" class="specs__item">
      <dt class="specs__label">
        <BaseIcon :name="spec.icon" :size="18" />
        {{ spec.label }}
      </dt>
      <dd class="specs__value u-numeric">{{ spec.value }}</dd>
    </div>
  </dl>
</template>

<style scoped lang="scss">
.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;

  @include respond-to('md') {
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.1rem;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    transition: border-color 0.3s $ease-out, transform 0.3s $ease-out;

    &:hover {
      border-color: var(--color-border-strong);
      transform: translateY(-3px);
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: var(--fs-eyebrow);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-dim);

    :deep(.icon) {
      color: var(--color-gold);
    }
  }

  &__value {
    font-size: var(--fs-lg);
    font-weight: 700;
    color: var(--color-text);
  }
}
</style>
