<script setup lang="ts">
// Sticky site header: transparent at the top, frosted glass once scrolled.
// Desktop inline nav + mobile slide-in drawer. Data comes from contentService.
import { contentService } from '~/services/content.service'
import { whatsappBaseLink } from '~/services/whatsapp.service'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const nav = contentService.getMainNav()
const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Close the mobile drawer whenever the route changes.
watch(() => route.fullPath, () => (menuOpen.value = false))

// Lock body scroll while the drawer is open.
watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const isActive = (to: string) => route.path === localePath(to) || route.path.startsWith(localePath(to) + '/')
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__bar container--wide">
      <NuxtLink :to="localePath('/')" class="header__brand" :aria-label="t('a11y.home')">
        <BrandLogo />
      </NuxtLink>

      <nav class="header__nav" :aria-label="t('a11y.primaryNav')">
        <NuxtLink
          v-for="item in nav"
          :key="item.id"
          :to="localePath(item.to)"
          class="header__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <LanguageSwitcher />
        <BaseButton
          :href="whatsappBaseLink()"
          target="_blank"
          variant="primary"
          size="sm"
          icon-left="whatsapp"
          class="header__cta"
        >
          {{ t('nav.enquire') }}
        </BaseButton>
        <button
          class="header__burger"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
          @click="menuOpen = !menuOpen"
        >
          <BaseIcon :name="menuOpen ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="drawer">
        <nav class="drawer__nav" :aria-label="t('a11y.primaryNav')">
          <NuxtLink
            v-for="item in nav"
            :key="item.id"
            :to="localePath(item.to)"
            class="drawer__link"
          >
            {{ t(item.labelKey) }}
            <BaseIcon name="arrow-up-right" :size="18" />
          </NuxtLink>
        </nav>
        <BaseButton
          :href="whatsappBaseLink()"
          target="_blank"
          variant="primary"
          block
          icon-left="whatsapp"
        >
          {{ t('nav.enquire') }}
        </BaseButton>
      </div>
    </Transition>
    <div v-if="menuOpen" class="drawer__scrim" @click="menuOpen = false" />
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: z('header');
  transition: background 0.35s $ease-out, border-color 0.35s $ease-out, backdrop-filter 0.35s;
  border-bottom: 1px solid transparent;

  &.is-scrolled {
    @include glass;
    border-bottom-color: var(--color-border);
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-h);
    gap: 1rem;
  }

  &__nav {
    display: none;
    align-items: center;
    gap: 0.4rem;

    @include respond-to('lg') {
      display: flex;
    }
  }

  &__link {
    position: relative;
    padding: 0.5rem 0.9rem;
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    border-radius: var(--radius-sm);
    transition: color 0.2s $ease-out;
    @include focus-ring(var(--color-gold), 2px);

    &::after {
      content: '';
      position: absolute;
      left: 0.9rem;
      right: 0.9rem;
      bottom: 0.35rem;
      height: 1.5px;
      background: var(--color-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s $ease-out;
    }

    &:hover {
      color: var(--color-text);
    }

    &.is-active {
      color: var(--color-text);

      &::after {
        transform: scaleX(1);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__cta {
    display: none;

    @include respond-to('sm') {
      display: inline-flex;
    }
  }

  &__burger {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    color: var(--color-text);
    border-radius: var(--radius-sm);
    @include focus-ring(var(--color-gold), 2px);

    @include respond-to('lg') {
      display: none;
    }
  }
}

.drawer {
  position: fixed;
  inset: var(--header-h) 0 auto 0;
  z-index: z('drawer');
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem $gutter 2rem;
  @include glass(rgba(10, 11, 13, 0.96));
  border-bottom: 1px solid var(--color-border);

  @include respond-to('lg') {
    display: none;
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.25rem;
    font-family: $font-display;
    font-size: 1.5rem;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-hairline);

    :deep(.icon) {
      color: var(--color-gold);
    }
  }

  &__scrim {
    position: fixed;
    inset: 0;
    z-index: z('sticky');
    background: rgba(0, 0, 0, 0.55);

    @include respond-to('lg') {
      display: none;
    }
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.35s $ease-out, opacity 0.35s $ease-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}
</style>
