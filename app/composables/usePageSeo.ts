// =============================================================================
// Localized per-page SEO helper. Accepts refs/getters so title & description
// stay reactive to the active locale. Centralizes brand suffix + OG/Twitter and
// lets a page override the share image (e.g. a car photo on a detail page).
// =============================================================================
import { brandConfig } from '~/config/brand.config'

type Source = MaybeRefOrGetter<string>

interface PageSeoOptions {
  /** Absolute or root-relative OG/Twitter image path. */
  image?: MaybeRefOrGetter<string | undefined>
  /** OG type; defaults to 'website'. */
  type?: 'website' | 'article' | 'product'
}

export const usePageSeo = (
  title: Source,
  description: Source,
  options: PageSeoOptions = {},
) => {
  const site = useSiteConfig()
  const fullTitle = () => `${toValue(title)} · ${brandConfig.name}`
  const image = () => {
    const img = toValue(options.image)
    if (!img) return `${site.url}/og-image.png`
    return img.startsWith('http') ? img : `${site.url}${img}`
  }

  useSeoMeta({
    title: () => toValue(title),
    ogTitle: fullTitle,
    twitterTitle: fullTitle,
    description: () => toValue(description),
    ogDescription: () => toValue(description),
    twitterDescription: () => toValue(description),
    ogType: options.type ?? 'website',
    ogSiteName: brandConfig.name,
    ogImage: image,
    twitterImage: image,
    twitterCard: 'summary_large_image',
  })
}
