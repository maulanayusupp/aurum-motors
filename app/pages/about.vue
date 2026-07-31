<script setup lang="ts">
// About page: brand story, principles, and an honest note that AURUM is a
// demonstration showroom. Copy in i18n; principles reuse the value props.
import { usePageSeo } from '~/composables/usePageSeo'
import { contentService } from '~/services/content.service'
import { mailLink } from '~/services/mail.service'

const { t } = useI18n()
const localePath = useLocalePath()
const principles = contentService.getValueProps()
const mailHref = computed(() => mailLink(t('mail.generic'), t('mail.subject')))

usePageSeo(
  () => t('meta.about.title'),
  () => t('meta.about.description'),
)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('about.eyebrow')"
      :title="t('about.title')"
      :lead="t('about.lead')"
    />

    <section class="section--tight container--wide">
      <div class="story">
        <div class="story__media">
          <img
            src="/cars/about-showroom.jpg"
            :alt="t('about.imageAlt')"
            class="story__img"
            width="1400"
            height="933"
            loading="lazy"
            decoding="async"
          />
          <div class="story__glow" aria-hidden="true" />
        </div>
        <div class="story__text">
          <h2 class="story__title">{{ t('about.story.title') }}</h2>
          <p v-for="i in 3" :key="i" class="story__p">{{ t(`about.story.p${i}`) }}</p>
          <BaseButton :href="mailHref" variant="gold-outline" icon-left="mail">
            {{ t('about.story.cta') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="section container--wide">
      <SectionHeading
        :eyebrow="t('about.principles.eyebrow')"
        :title="t('about.principles.title')"
        align="center"
      />
      <div class="principles">
        <RevealOnScroll
          v-for="(item, i) in principles"
          :key="item.id"
          as="article"
          :delay="Math.min(i + 1, 12)"
        >
          <div class="principle">
            <span class="principle__icon"><BaseIcon :name="item.icon" :size="22" /></span>
            <h3 class="principle__title">{{ t(item.titleKey) }}</h3>
            <p class="principle__body">{{ t(item.bodyKey) }}</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped lang="scss">
.story {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;

  @include respond-to('lg') {
    grid-template-columns: 1fr 1fr;
  }

  &__media {
    position: relative;
    order: -1;

    @include respond-to('lg') {
      order: 0;
    }
  }

  &__img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-strong);
  }

  &__glow {
    position: absolute;
    inset: auto 10% -10% 10%;
    height: 40%;
    background: radial-gradient(ellipse at center, var(--color-gold-glow), transparent 65%);
    filter: blur(26px);
    pointer-events: none;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  &__title {
    font-size: var(--fs-h2);
    margin-bottom: 0.4rem;
  }

  &__p {
    color: var(--color-text-muted);
    line-height: 1.8;
  }
}

.principles {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.principle {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);

  &__icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    color: var(--color-gold);
    background: rgba(201, 162, 75, 0.1);
    border: 1px solid var(--color-border-strong);
  }

  &__title {
    font-family: $font-sans;
    font-size: var(--fs-lg);
    font-weight: 700;
  }

  &__body {
    color: var(--color-text-muted);
    font-size: var(--fs-sm);
    line-height: 1.7;
  }
}
</style>
