<script setup lang="ts">
// Privacy policy — content lives entirely in i18n as a `sections` array so both
// locales stay in lockstep and the page stays presentational.
import { usePageSeo } from '~/composables/usePageSeo'

const { t, tm, rt } = useI18n()

interface RawSection { heading: unknown; paragraphs: unknown[] }
const sections = computed(() =>
  (tm('privacy.sections') as RawSection[]).map((s) => ({
    heading: rt(s.heading as string),
    paragraphs: (s.paragraphs as string[]).map((p) => rt(p)),
  })),
)

usePageSeo(
  () => t('meta.privacy.title'),
  () => t('meta.privacy.description'),
)
</script>

<template>
  <div>
    <PageHero :eyebrow="t('privacy.eyebrow')" :title="t('privacy.title')" :lead="t('privacy.lead')" />
    <LegalDocument :sections="sections" :updated="t('privacy.updated')" />
  </div>
</template>
