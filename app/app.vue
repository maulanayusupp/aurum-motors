<script setup lang="ts">
// Root component: sets <html lang> + hreflang alternates from the active
// locale, and the global title template. Page content renders via layouts.
import { brandConfig } from '~/config/brand.config'

const head = useLocaleHead({ addSeoAttributes: true })
const { t } = useI18n()

useHead({
  htmlAttrs: computed(() => ({ lang: head.value.htmlAttrs?.lang ?? 'id' })),
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? []),
  titleTemplate: (title) =>
    title ? `${title} · ${brandConfig.name}` : `${brandConfig.name} — ${t('meta.tagline')}`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
