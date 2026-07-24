import { fileURLToPath } from 'node:url'

// Inject shared SCSS (variables + mixins, no CSS output) into every component's
// <style lang="scss"> block. Absolute path so Sass @use always resolves.
const scssShared = fileURLToPath(
  new URL('./app/assets/scss/_shared.scss', import.meta.url),
)

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://aurum-motors.vercel.app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/seo'],

  // Name components by filename only (ignore folder prefix) for concise tags.
  components: [{ path: '~/components', pathPrefix: false }],

  // Single centralized SCSS entrypoint. No inline styles anywhere in the app.
  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700;800&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#0a0b0d' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  // @nuxtjs/seo site-wide identity (sitemap, robots, og-image, schema.org).
  site: {
    url: siteUrl,
    name: 'AURUM Motorworks',
    description:
      'AURUM — bursa mobil mewah baru & bekas pilihan. Setiap unit terkurasi, terperiksa, dan transparan. Konsultasi langsung via WhatsApp.',
    defaultLocale: 'id',
  },

  // Dynamic OG-image rendering needs a native renderer (@takumi-rs/core) we do
  // not bundle; OG meta tags are still set manually via usePageSeo. See TODO.md.
  ogImage: { enabled: false },

  i18n: {
    baseUrl: siteUrl,
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    bundle: {
      // Silences the v10 optimize-directive advisory; we use $t/useI18n.
      optimizeTranslationDirective: false,
    },
  },

  runtimeConfig: {
    public: {
      siteUrl,
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'maulanayusupp@gmail.com',
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '6287822766333',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "${scssShared}" as *;`,
        },
      },
    },
  },

  typescript: {
    typeCheck: false,
    strict: true,
  },
})
