<script setup lang="ts">
// Full-width closing call-to-action band with a gold-glow backdrop, driving to
// email (primary) and the contact page (secondary).
import { mailLink } from '~/services/mail.service'

const { t } = useI18n()
const localePath = useLocalePath()
const mailHref = computed(() => mailLink(t('mail.generic'), t('mail.subject')))
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="cta">
        <div class="cta__glow" aria-hidden="true" />
        <div class="cta__content">
          <span class="u-eyebrow">{{ t('home.cta.eyebrow') }}</span>
          <h2 class="cta__title">{{ t('home.cta.title') }}</h2>
          <p class="cta__lead u-lead">{{ t('home.cta.lead') }}</p>
          <div class="cta__actions">
            <BaseButton :href="mailHref" variant="primary" size="lg" icon-left="mail">
              {{ t('home.cta.primary') }}
            </BaseButton>
            <BaseButton :to="localePath('/contact')" variant="secondary" size="lg" icon-right="arrow-right">
              {{ t('home.cta.secondary') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  position: relative;
  overflow: hidden;
  padding: clamp(2.5rem, 6vw, 5rem);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-strong);
  background:
    radial-gradient(ellipse 80% 120% at 100% 0%, rgba(201, 162, 75, 0.16), transparent 60%),
    linear-gradient(180deg, var(--color-surface-2), var(--color-bg-2));
  text-align: center;

  &__glow {
    position: absolute;
    inset: -40% -10% auto -10%;
    height: 60%;
    background: radial-gradient(ellipse at center, var(--color-gold-glow), transparent 65%);
    filter: blur(30px);
    pointer-events: none;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    max-width: 44rem;
    margin-inline: auto;
  }

  &__title {
    font-size: var(--fs-h2);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>
