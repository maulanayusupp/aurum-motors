<script setup lang="ts">
// Compliance / trust page. States honest working practices only — no
// certification or partnership claims (avoid over-claiming). Includes a clear
// placeholder/demo disclaimer.
import { usePageSeo } from '~/composables/usePageSeo'
import { contentService } from '~/services/content.service'
import { mailLink } from '~/services/mail.service'

const { t } = useI18n()
const items = contentService.getComplianceItems()
const mailHref = computed(() => mailLink(t('mail.generic'), t('mail.subject')))

usePageSeo(
  () => t('meta.compliance.title'),
  () => t('meta.compliance.description'),
)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('compliance.eyebrow')"
      :title="t('compliance.title')"
      :lead="t('compliance.lead')"
    />

    <section class="section--tight container--wide">
      <div class="grid">
        <RevealOnScroll
          v-for="(item, i) in items"
          :key="item.id"
          as="article"
          :delay="Math.min((i % 3) + 1, 12)"
        >
          <div class="item">
            <span class="item__icon"><BaseIcon :name="item.icon" :size="22" /></span>
            <h2 class="item__title">{{ t(item.titleKey) }}</h2>
            <p class="item__body">{{ t(item.bodyKey) }}</p>
          </div>
        </RevealOnScroll>
      </div>

      <aside class="disclaimer">
        <BaseIcon name="eye" :size="20" />
        <div>
          <h3 class="disclaimer__title">{{ t('compliance.disclaimer.title') }}</h3>
          <p class="disclaimer__body">{{ t('compliance.disclaimer.body') }}</p>
        </div>
      </aside>

      <div class="cta">
        <p class="cta__text">{{ t('compliance.help') }}</p>
        <BaseButton :href="mailHref" variant="primary" icon-left="mail">
          {{ t('compliance.helpCta') }}
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.3s $ease-out, transform 0.3s $ease-out;

  &:hover {
    border-color: var(--color-border-strong);
    transform: translateY(-3px);
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
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

.disclaimer {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-strong);
  background: rgba(201, 162, 75, 0.06);

  :deep(.icon) {
    color: var(--color-gold);
    flex-shrink: 0;
  }

  &__title {
    font-family: $font-sans;
    font-size: var(--fs-lg);
    font-weight: 700;
    margin-bottom: 0.4rem;
  }

  &__body {
    color: var(--color-text-muted);
    line-height: 1.75;
    font-size: var(--fs-sm);
  }
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);

  &__text {
    font-size: var(--fs-lg);
    font-weight: 600;
  }
}
</style>
