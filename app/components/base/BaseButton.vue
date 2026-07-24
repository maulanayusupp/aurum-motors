<script setup lang="ts">
// Polymorphic button: renders <NuxtLink> when `to` is set, <a> when `href` is
// set, otherwise a <button>. Variants + optional leading/trailing icons.
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'gold-outline'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    block?: boolean
    disabled?: boolean
    loading?: boolean
    iconLeft?: string
    iconRight?: string
    target?: string
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
const rel = computed(() =>
  props.target === '_blank' ? 'noopener noreferrer' : undefined,
)
const iconSize = computed(() => (props.size === 'lg' ? 20 : props.size === 'sm' ? 15 : 17))
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block, 'is-loading': loading }]"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :type="to || href ? undefined : type"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-busy="loading ? 'true' : undefined"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <BaseIcon v-if="iconLeft && !loading" :name="iconLeft" :size="iconSize" class="btn__icon" />
    <span class="btn__label"><slot /></span>
    <BaseIcon v-if="iconRight && !loading" :name="iconRight" :size="iconSize" class="btn__icon btn__icon--right" />
  </component>
</template>

<style scoped lang="scss">
.btn {
  --btn-pad-y: 0.8rem;
  --btn-pad-x: 1.5rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: var(--btn-pad-y) var(--btn-pad-x);
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: var(--fs-sm);
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.25s $ease-out,
    background 0.25s $ease-out,
    border-color 0.25s $ease-out,
    box-shadow 0.25s $ease-out,
    color 0.25s $ease-out;
  @include focus-ring;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }

  &__icon--right {
    transition: transform 0.25s $ease-out;
  }

  &:not(:disabled):hover &__icon--right {
    transform: translateX(3px);
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--sm {
    --btn-pad-y: 0.55rem;
    --btn-pad-x: 1.1rem;
    font-size: var(--fs-eyebrow);
  }

  &--lg {
    --btn-pad-y: 1.05rem;
    --btn-pad-x: 2rem;
    font-size: var(--fs-body);
  }

  // — Variants —
  &--primary {
    background: linear-gradient(135deg, var(--color-gold-soft), var(--color-gold) 55%, var(--color-gold-deep));
    color: var(--color-on-gold);
    box-shadow: var(--shadow-gold);

    &:not(:disabled):hover {
      box-shadow: 0 22px 70px -10px var(--color-gold-glow);
    }
  }

  &--secondary {
    background: var(--color-elevated);
    color: var(--color-text);
    border-color: var(--color-border);

    &:not(:disabled):hover {
      border-color: var(--color-border-strong);
      background: var(--color-surface-2);
    }
  }

  &--gold-outline {
    background: transparent;
    color: var(--color-gold);
    border-color: var(--color-border-strong);

    &:not(:disabled):hover {
      background: rgba(201, 162, 75, 0.08);
      border-color: var(--color-gold);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-text-muted);

    &:not(:disabled):hover {
      color: var(--color-text);
      background: rgba(244, 241, 234, 0.05);
    }
  }

  // — Loading spinner —
  &__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.7s linear infinite;
  }
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
