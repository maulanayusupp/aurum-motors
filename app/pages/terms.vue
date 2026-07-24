<script setup lang="ts">
// Terms of use — content lives entirely in i18n as a `sections` array so both
// locales stay in lockstep and the page stays presentational.
import { usePageSeo } from '~/composables/usePageSeo'

const { t, tm, rt } = useI18n()

interface RawSection { heading: unknown; paragraphs: unknown[] }
const sections = computed(() =>
  (tm('terms.sections') as RawSection[]).map((s) => ({
    heading: rt(s.heading as string),
    paragraphs: (s.paragraphs as string[]).map((p) => rt(p)),
  })),
)

usePageSeo(
  () => t('meta.terms.title'),
  () => t('meta.terms.description'),
)
</script>

<template>
  <div>
    <PageHero :eyebrow="t('terms.eyebrow')" :title="t('terms.title')" :lead="t('terms.lead')" />
    <LegalDocument :sections="sections" :updated="t('terms.updated')" />
  </div>
</template>
