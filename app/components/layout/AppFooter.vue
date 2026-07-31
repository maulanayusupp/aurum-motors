<script setup lang="ts">
// Site footer: brand blurb, explore + legal nav columns, contact details,
// socials, and a placeholder/disclaimer line. All copy via i18n.
import { brandConfig } from '~/config/brand.config'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const localePath = useLocalePath()

const explore = contentService.getFooterExploreNav()
const legal = contentService.getFooterLegalNav()
const socials = contentService.getSocialLinks()
const year = brandConfig.since
const currentYear = 2026
</script>

<template>
  <footer class="footer">
    <hr class="hairline" />
    <div class="footer__grid container--wide">
      <div class="footer__brandcol">
        <BrandLogo />
        <p class="footer__blurb">{{ t('footer.blurb') }}</p>
        <div class="footer__socials">
          <a
            v-for="s in socials"
            :key="s.id"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            :aria-label="s.id"
          >
            <BaseIcon :name="s.icon" :size="20" />
          </a>
        </div>
      </div>

      <nav class="footer__col" :aria-label="t('footer.explore')">
        <h4 class="footer__heading">{{ t('footer.explore') }}</h4>
        <NuxtLink
          v-for="item in explore"
          :key="item.id"
          :to="localePath(item.to)"
          class="footer__link"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <nav class="footer__col" :aria-label="t('footer.legal')">
        <h4 class="footer__heading">{{ t('footer.legal') }}</h4>
        <NuxtLink
          v-for="item in legal"
          :key="item.id"
          :to="localePath(item.to)"
          class="footer__link"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="footer__col">
        <h4 class="footer__heading">{{ t('footer.contact') }}</h4>
        <a :href="`mailto:${brandConfig.email}`" class="footer__contact">
          <BaseIcon name="mail" :size="17" /> {{ brandConfig.email }}
        </a>
        <p class="footer__contact footer__contact--static">
          <BaseIcon name="location" :size="17" /> {{ t('contact.info.addressValue') }}
        </p>
      </div>
    </div>

    <div class="footer__bar container--wide">
      <p class="footer__copy">
        © {{ year }}–{{ currentYear }} {{ brandConfig.fullName }}. {{ t('footer.rights') }}
      </p>
      <p class="footer__disclaimer">{{ t('footer.disclaimer') }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: var(--space-8);

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-block: clamp(3rem, 6vw, 4.5rem);

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }

    @include respond-to('lg') {
      grid-template-columns: 2fr 1fr 1fr 1.4fr;
    }
  }

  &__brandcol {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    max-width: 22rem;
  }

  &__blurb {
    color: var(--color-text-muted);
    font-size: var(--fs-sm);
    line-height: 1.7;
  }

  &__socials {
    display: flex;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  &__social {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    transition: color 0.25s $ease-out, border-color 0.25s, transform 0.25s;
    @include focus-ring;

    &:hover {
      color: var(--color-gold);
      border-color: var(--color-border-strong);
      transform: translateY(-2px);
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  &__heading {
    font-family: $font-sans;
    font-size: var(--fs-eyebrow);
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-gold);
    margin-bottom: 0.15rem;
  }

  &__link,
  &__contact {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--fs-sm);
    color: var(--color-text-muted);
    transition: color 0.2s $ease-out;
    width: fit-content;
    @include focus-ring(var(--color-gold), 2px);

    &:hover {
      color: var(--color-text);
    }

    :deep(.icon) {
      color: var(--color-gold);
    }
  }

  &__contact--static {
    color: var(--color-text-muted);
    cursor: default;
  }

  &__bar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-block: 1.75rem;
    border-top: 1px solid var(--color-hairline);

    @include respond-to('md') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__copy,
  &__disclaimer {
    font-size: var(--fs-eyebrow);
    color: var(--color-text-dim);
    letter-spacing: 0.03em;
  }

  &__disclaimer {
    max-width: 34rem;
  }
}
</style>
