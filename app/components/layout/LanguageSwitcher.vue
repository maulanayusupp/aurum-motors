<script setup lang="ts">
// EN/ID toggle. Uses i18n's locale-preserving route switching so the current
// page stays put when the language changes.
const { locale, locales, setLocale } = useI18n()

const available = computed(() =>
  (locales.value as { code: string; name: string }[]).map((l) => ({
    code: l.code,
    short: l.code.toUpperCase(),
  })),
)

const switchTo = (code: string) => {
  if (code !== locale.value) setLocale(code as 'en' | 'id')
}
</script>

<template>
  <div class="lang" role="group" :aria-label="'Language'">
    <button
      v-for="l in available"
      :key="l.code"
      class="lang__btn"
      :class="{ 'is-active': l.code === locale }"
      :aria-pressed="l.code === locale"
      @click="switchTo(l.code)"
    >
      {{ l.short }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.lang {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-surface);

  &__btn {
    padding: 0.3rem 0.7rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-eyebrow);
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-text-dim);
    transition: color 0.2s $ease-out, background 0.2s $ease-out;
    @include focus-ring(var(--color-gold), 2px);

    &:hover {
      color: var(--color-text);
    }

    &.is-active {
      color: var(--color-on-gold);
      background: var(--color-gold);
    }
  }
}
</style>
