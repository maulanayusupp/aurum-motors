<script setup lang="ts">
// Persistent floating email button — the only sales channel. Appears on every
// page (rendered from the default layout). Reveals after a small scroll.
import { mailLink } from '~/services/mail.service'

const { t } = useI18n()
const shown = ref(false)

const link = computed(() => mailLink(t('mail.generic'), t('mail.subject')))

const onScroll = () => {
  shown.value = window.scrollY > 280
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fab">
    <a
      v-show="shown"
      :href="link"
      class="fab"
      :aria-label="t('mail.fabLabel')"
    >
      <span class="fab__pulse" aria-hidden="true" />
      <BaseIcon name="mail" :size="28" />
      <span class="fab__text">{{ t('mail.fabText') }}</span>
    </a>
  </Transition>
</template>

<style scoped lang="scss">
.fab {
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: z('fab');
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, var(--color-gold), var(--color-gold-deep));
  color: var(--color-bg);
  font-weight: 700;
  font-size: var(--fs-sm);
  box-shadow: 0 14px 40px -8px rgba(201, 162, 75, 0.55);
  transition: transform 0.3s $ease-spring, box-shadow 0.3s $ease-out;
  @include focus-ring;

  &:hover {
    transform: translateY(-3px) scale(1.03);
  }

  &__pulse {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    z-index: -1;
    animation: fab-pulse 2.4s $ease-out infinite;
  }

  &__text {
    display: none;

    @include respond-to('sm') {
      display: inline;
    }
  }
}

@keyframes fab-pulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  70%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.fab-enter-active,
.fab-leave-active {
  transition: transform 0.35s $ease-spring, opacity 0.35s $ease-out;
}

.fab-enter-from,
.fab-leave-to {
  transform: translateY(20px) scale(0.8);
  opacity: 0;
}
</style>
