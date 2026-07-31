<script setup lang="ts">
// Contact page: quick-contact channels (email only) + the enquiry form.
import { usePageSeo } from '~/composables/usePageSeo'
import { brandConfig } from '~/config/brand.config'

const { t } = useI18n()

const channels = computed(() => [
  {
    id: 'email',
    icon: 'mail',
    label: t('contact.channels.email'),
    value: brandConfig.email,
    href: `mailto:${brandConfig.email}`,
    external: false,
    accent: true,
  },
])

usePageSeo(
  () => t('meta.contact.title'),
  () => t('meta.contact.description'),
)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('contact.eyebrow')"
      :title="t('contact.title')"
      :lead="t('contact.lead')"
    />

    <section class="section--tight container--wide">
      <div class="contact">
        <div class="contact__channels">
          <a
            v-for="ch in channels"
            :key="ch.id"
            :href="ch.href"
            :target="ch.external ? '_blank' : undefined"
            :rel="ch.external ? 'noopener noreferrer' : undefined"
            class="channel"
            :class="{ 'channel--accent': ch.accent }"
          >
            <span class="channel__icon"><BaseIcon :name="ch.icon" :size="22" /></span>
            <span class="channel__meta">
              <span class="channel__label">{{ ch.label }}</span>
              <span class="channel__value">{{ ch.value }}</span>
            </span>
            <BaseIcon name="arrow-up-right" :size="16" class="channel__go" />
          </a>

          <div class="channel channel--static">
            <span class="channel__icon"><BaseIcon name="location" :size="22" /></span>
            <span class="channel__meta">
              <span class="channel__label">{{ t('contact.channels.address') }}</span>
              <span class="channel__value">{{ t('contact.info.addressValue') }}</span>
            </span>
          </div>
          <div class="channel channel--static">
            <span class="channel__icon"><BaseIcon name="clock" :size="22" /></span>
            <span class="channel__meta">
              <span class="channel__label">{{ t('contact.channels.hours') }}</span>
              <span class="channel__value">{{ t('contact.info.hoursValue') }}</span>
            </span>
          </div>
        </div>

        <div class="contact__form">
          <h2 class="contact__form-title">{{ t('contact.formTitle') }}</h2>
          <p class="contact__form-lead">{{ t('contact.formLead') }}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;

  @include respond-to('lg') {
    grid-template-columns: 0.85fr 1.15fr;
  }

  &__channels {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  &__form-title {
    font-size: var(--fs-h3);
    margin-bottom: 0.5rem;
  }

  &__form-lead {
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
  }
}

.channel {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.25s $ease-out, transform 0.25s $ease-out, background 0.25s;
  @include focus-ring;

  &:not(.channel--static):hover {
    border-color: var(--color-border-strong);
    transform: translateX(4px);
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    color: var(--color-gold);
    background: rgba(201, 162, 75, 0.1);
    border: 1px solid var(--color-border);
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  &__label {
    font-size: var(--fs-eyebrow);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  &__value {
    font-weight: 600;
    color: var(--color-text);
    word-break: break-word;
  }

  &__go {
    margin-left: auto;
    color: var(--color-text-dim);
    flex-shrink: 0;
  }

  &--accent {
    background: linear-gradient(120deg, rgba(37, 211, 102, 0.1), var(--color-surface));
    border-color: rgba(37, 211, 102, 0.3);

    .channel__icon {
      color: #25d366;
      background: rgba(37, 211, 102, 0.12);
    }
  }

  &--static {
    cursor: default;
  }
}
</style>
