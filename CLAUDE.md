# CLAUDE.md — Project guide for AI assistants & contributors

> Keep this file in sync with reality. **Any change to code rules, features,
> pages, or content MUST also update: this file, the compliance page(s), and
> BOTH i18n locales (`en` + `id`).** This is a hard project rule (see §Rules).

## What this is

**AURUM** (an editable **placeholder** brand — not a real company) is a
**luxury car marketplace / e-commerce showroom** for **new & pre-owned** cars.
It is designed to feel premium and interactive so it attracts buyers, and to be
easy to maintain and scale. Because individual cars are high-ticket items, the
"checkout" is an **email handoff** (prefilled enquiry) rather than an online
cart — this is intentional, not a missing feature.

Content model: the catalogue = **12 demonstration units** (`inventory.config.ts`
— hard facts only; prose lives in i18n by car `slug`). Homepage marketing blocks
(value props, process, testimonials, marquee) come from `site.config.ts`. The
compliance page states **honest working practices only** (inspection, complete
documents, data protection, transparency, secure transactions, clear after-sale
terms) with a **demo disclaimer** — NO certification/partnership/over-claims.
Sales contact: Maulana Yusup Abdullah, email `maulanayusupp@gmail.com`. Email is
the **only** published channel — no phone number, no WhatsApp.

## Stack (verified versions — 2026-07-24)

| Concern    | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | **Nuxt 4.5.0** (Vue 3.5, Nitro 2, Vite)       |
| Language   | TypeScript (strict)                           |
| i18n       | `@nuxtjs/i18n` 10.5.0 — EN + **ID (default)** |
| SEO        | `@nuxtjs/seo` 5.3.6 (sitemap, robots, schema) |
| Styling    | **SCSS only** (`sass` 1.101.7), no inline CSS |
| Favicons   | `favicons` 7.3.1 (build-time script)          |
| OG image   | `sharp` 0.34.5 (build-time script)            |
| Node       | ≥ 20.11                                        |

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build (validated locally)
pnpm preview      # run the built server
pnpm generate     # static generation
pnpm favicons     # regenerate favicons from assets/favicon-source.svg
pnpm og           # regenerate og-image.png from assets/og-source.svg
pnpm cars         # re-download the demo car photos into public/cars
pnpm typecheck    # vue-tsc type check
```

## Directory map (Nuxt 4 `app/` srcDir)

```
app/
  app.vue                 # root: i18n <html> head + title template
  error.vue               # 404/500 page
  assets/scss/            # design system (see §Styling)
  components/
    base/     # BaseIcon, BaseButton, BaseBadge, BaseSelect, BaseField
    layout/   # AppHeader, AppFooter, BrandLogo, LanguageSwitcher, ContactFab
    common/   # SectionHeading, PageHero, LegalDocument, RevealOnScroll
    home/     # HeroShowcase, BrandMarquee, FeaturedCars, ValueProps,
              #   ProcessSteps, TestimonialWall, CtaBand
    catalog/  # CarCard, CarGrid, InventoryFilters, PriceTag
    car/      # CarGallery, CarSpecs, CarInquiry
    contact/  # ContactForm
  composables/  # usePageSeo, useCurrency, useInventoryFilters, useReveal, useTilt
  config/       # brand / navigation / inventory / site config (structure, NOT text)
  services/     # content, inventory, mail, contact (data-access + logic layer)
  utils/        # format (currency/number), iconPaths (icon library)
  types/        # shared TS types
  layouts/default.vue      # header + <slot> + footer + email FAB + skip link
  pages/        # index, inventory/index, inventory/[slug], about, contact,
                #   compliance, privacy, terms
i18n/locales/{en,id}.json  # ALL user-facing text
public/cars/               # demo car photos (+ hero/about); og-image + favicons
scripts/                   # generate-favicons, generate-og, download-cars
assets/                    # favicon-source.svg, og-source.svg (source of truth)
```

Components are auto-imported by **filename** (`pathPrefix: false`), so folder
names don't appear in tags: `<BaseIcon>`, `<CarCard>`, `<AppHeader>`, etc.

## Architecture conventions

- **Config → Services → Composables/Components.** Components never import
  `config/*` directly; they go through the `services/*` layer. This lets the
  content source move to a CMS/API later without touching UI.
- **Structure vs. text.** `config/*` holds structure (ids, icons, prices,
  specs, routes, image paths). All human-readable strings live in i18n by key.
- **Business logic in services.** Filtering/sorting/search lives in
  `inventory.service`; `mailto:` deep-linking in `mail.service`; validation
  in `contact.service`. Composables are thin (`useInventoryFilters` binds
  service + URL state; `useCurrency` binds formatting to the locale).
- **Helpers = composables** (`usePageSeo`, `useCurrency`, `useReveal`, `useTilt`)
  and pure functions in `utils/` (`format`, `iconPaths`).

## E-commerce / email model

- Cars are browsed on `/inventory` (filterable, URL-synced) and detailed on
  `/inventory/[slug]` (gallery + specs + highlights + Product JSON-LD).
- The purchase path is an **email handoff**: `mail.service` builds `mailto:`
  links with a **localized, prefilled** subject + body (car name, price, URL).
  Templates use `%car%` / `%price%` / `%url%` tokens (NOT vue-i18n `{}` syntax,
  so the raw template survives translation before substitution).
- A floating email button (`ContactFab`) is present on every page.

## Styling (SCSS, no inline CSS — hard rule)

- `_variables.scss` (breakpoints, z-scale, easing, fonts) + `_mixins.scss`
  (`z()`, `respond-to`, `glass`, `focus-ring`, `container`, `gold-text`,
  `line-clamp`, `visually-hidden`) are **injected into every component** via
  `nuxt.config` → `vite.css.preprocessorOptions.scss.additionalData` (absolute
  path to `_shared.scss`). Use `$` vars and mixins in any scoped `<style>`.
- Runtime design values are **CSS custom properties** in `_tokens.scss`
  (`var(--color-gold)`, spacing, radii, shadows). **Single luxury dark theme**
  (champagne gold on near-black) — no light mode / toggle by design.
- `main.scss` is the single global entry (tokens → reset → typography → base →
  utilities), referenced by `nuxt.config` `css`.
- **Never** use `style="..."` in templates. Dynamic values (tilt, pointer
  position) are written to **CSS custom properties** from composables
  (`useTilt`) and consumed in SCSS — not as inline style rules.

## i18n

- Locales in `i18n/locales/{en,id}.json`; **ID is the default** (no prefix),
  EN is under `/en/*` (`strategy: 'prefix_except_default'`).
- Keys mirror the page/section structure. **Keep EN and ID in lockstep** — same
  keys, no missing translations. Car prose is under `cars.<slug>.{tagline,
  description}`; shared feature names under `f.*`.
- Email car-enquiry templates use `%token%` placeholders (see above).
- Legal pages (`privacy`, `terms`) read a `sections[]` array via `tm()` + `rt()`.

## SEO & social link previews

- Per-page: `usePageSeo(titleGetter, descGetter, { image, type })` (reactive to
  locale). It emits an **absolute** `og:image` + `og:image:secure_url`,
  `og:image:type`, `og:image:width/height` (1200×630), `og:image:alt`,
  `og:url`, and matching Twitter tags — this is what WhatsApp / Instagram /
  Facebook read to render a rich link-preview card.
- **Share images are a uniform 1200×630.** Default is `og-image.png`; each car
  page uses a per-car crop at `/cars/social/<file>.jpg` (`carSocialImage()` maps
  `/cars/x.jpg` → `/cars/social/x.jpg`). Both are generated by **`pnpm og`**
  (sharp) — regenerate after changing `og-source.svg` or car photos.
- Global title template + hreflang/`<html lang>` in `app.vue` via
  `useLocaleHead`. Canonical URL is per-route.
- Sitemap/robots auto-generated by `@nuxtjs/seo`. Site URL from
  `NUXT_PUBLIC_SITE_URL` (see `.env.example`), default
  `https://aurum-motors-ten.vercel.app` (trailing slash stripped in config).
- Car detail pages emit **Product/Car JSON-LD** (schema.org) via `useHead`.
- Dynamic OG **image** generation is disabled (`ogImage.enabled=false`) — we use
  the pre-generated static images above.
- **Preview caching:** WhatsApp/Facebook cache aggressively. After deploy,
  refresh via Facebook Sharing Debugger (developers.facebook.com/tools/debug/)
  → "Scrape Again"; WhatsApp then picks up the refreshed card.

## Rules (do not break)

1. **No inline CSS.** SCSS only, centralized as above.
2. **Multilingual parity.** Update EN + ID together for every text change.
3. **Sync on change.** Every code/rule/feature change updates this file, the
   compliance page(s), and both locales.
4. **Evidence over assumption.** Verify versions/APIs before relying on them.
5. **No over-claiming.** Content stays honest; AURUM is a demonstration
   showroom (see the compliance disclaimer + footer). No fake credentials,
   awards, certifications, or partnerships.
6. **Commits.** Author = **Maulana Yusup Abdullah <maulanayusupp@gmail.com>**.
   **No AI/Claude co-author trailer.** Commit **and push** after each change.
7. **Brand is a placeholder.** Do not present AURUM as a real institution.
8. **Images.** Demo car photos in `public/cars` are licence-free samples
   (`pnpm cars` documents the source); swap for real photography before launch.

## Backlog

See [TODO.md](./TODO.md).
