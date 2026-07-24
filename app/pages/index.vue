<script setup lang="ts">
// Homepage: hero → brand marquee → featured cars → value props → process →
// testimonials → closing CTA. Composition of home/* components; no logic here.
import { usePageSeo } from '~/composables/usePageSeo'

const { t } = useI18n()
usePageSeo(
  () => t('meta.home.title'),
  () => t('meta.home.description'),
)
</script>

<template>
  <div>
    <HeroShowcase />
    <BrandMarquee />
    <FeaturedCars />
    <ValueProps />
    <ProcessSteps />
    <TestimonialWall />
    <CtaBand />
  </div>
</template>
