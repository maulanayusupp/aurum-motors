# TODO — Roadmap & next features

Add new ideas here. When you ship one, move it to **Done** with a date and
update `CLAUDE.md` + both locales + compliance pages as needed.

## High priority

- [ ] **Real enquiry endpoint.** Replace the simulated `contact.service.submit`
      with a Nuxt server route (`server/api/contact.post.ts`) + email/CRM/
      WhatsApp Business API, so form leads are captured, not only handed off.
- [ ] **Real photography.** Swap the licence-free demo photos in `public/cars`
      for owned showroom photography (keep the same filenames). Add multiple
      genuine angles per car for the gallery.
- [ ] **Self-hosted fonts.** Add `@nuxt/fonts` to self-host Playfair Display /
      Manrope (removes the Google Fonts request; better privacy + offline).

## Catalogue / e-commerce

- [ ] Move inventory behind a **CMS/API** via `content.service`/`inventory.
      service` (contract already isolates it) so non-devs can add cars.
- [ ] **Saved / compare** list (favourite cars, side-by-side spec compare).
- [ ] **Price on request** + **reserved/sold** states per unit.
- [ ] **Finance calculator** (illustrative monthly estimate) + trade-in form.
- [ ] Pagination / infinite scroll once inventory exceeds ~24 units.
- [ ] Price range + year range + mileage filters; multi-select facets.
- [ ] Dynamic **OG image per car** (`@takumi-rs/core` or a satori component).

## Content & pages

- [ ] **Blog / editorial** (buying guides, model spotlights) via `@nuxt/content`.
- [ ] **Sell your car** page (consignment intake form → WhatsApp).
- [ ] Team / showroom **location page** with an embedded map.
- [ ] Real testimonials with consent once available (currently illustrative).

## i18n & a11y

- [ ] Add more locales (e.g. `zh`, `ms`) — keep all keys in lockstep.
- [ ] Locale-aware **date** formatting for "last updated" on legal pages.
- [ ] Automated a11y audit (axe) + keyboard-nav review of filters/gallery/drawer.
- [ ] Full **prefers-reduced-motion** review (tilt + marquee already covered).

## Platform / quality

- [ ] **PWA** (installable) via `@vite-pwa/nuxt` using the generated manifest.
- [ ] **Analytics** + privacy-friendly consent banner.
- [ ] Unit tests (Vitest) for services (`inventory`, `whatsapp`, `format`) +
      component tests; Playwright e2e for nav, filters, and enquiry flow.
- [ ] CI: typecheck, build, lint on PRs.

## Done

- [x] 2026-07-24 — Initial site: Nuxt 4 luxury car marketplace (AURUM). 8 pages
      (home, inventory list + detail, about, contact, compliance, privacy,
      terms), 12 demo units, EN/ID i18n (default ID), SCSS design system
      (champagne-gold dark theme), WhatsApp e-commerce handoff + floating FAB,
      URL-synced inventory filters, interactive tilt/reveal UI, Product JSON-LD,
      SEO (sitemap/robots/OG), generated favicons + OG image.
