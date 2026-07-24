<script setup lang="ts">
// Homepage featured rail: a curated selection of units with a "view all" link.
import { inventoryService } from '~/services/inventory.service'

const { t } = useI18n()
const localePath = useLocalePath()
const featured = inventoryService.getFeatured(6)
</script>

<template>
  <section class="section container--wide">
    <SectionHeading
      :eyebrow="t('home.featured.eyebrow')"
      :title="t('home.featured.title')"
      :lead="t('home.featured.lead')"
    >
      <template #action>
        <BaseButton :to="localePath('/inventory')" variant="secondary" icon-right="arrow-right">
          {{ t('home.featured.viewAll') }}
        </BaseButton>
      </template>
    </SectionHeading>

    <CarGrid :cars="featured" :eager-first="3" />
  </section>
</template>
