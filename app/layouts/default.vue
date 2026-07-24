<script setup lang="ts">
// Default layout: skip link, sticky header, page slot, footer, and the
// floating WhatsApp action that is present on every page.
const { t } = useI18n()
</script>

<template>
  <a href="#main" class="skip-link">{{ t('a11y.skipToContent') }}</a>
  <AppHeader />
  <main id="main" class="layout__main">
    <slot />
  </main>
  <AppFooter />
  <WhatsAppFab />
</template>

<style scoped lang="scss">
.layout__main {
  flex: 1;
}
</style>
