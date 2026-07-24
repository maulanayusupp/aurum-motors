<script setup lang="ts">
// Styled native <select> with a label and chevron. Uses v-model.
defineProps<{
  label: string
  options: { value: string; label: string }[]
  icon?: string
}>()

const model = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div class="select">
    <label :for="id" class="select__label">
      <BaseIcon v-if="icon" :name="icon" :size="14" />
      {{ label }}
    </label>
    <div class="select__control">
      <select :id="id" v-model="model" class="select__input">
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <BaseIcon name="chevron-down" :size="16" class="select__chevron" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--fs-eyebrow);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-dim);
  }

  &__control {
    position: relative;
  }

  &__input {
    appearance: none;
    width: 100%;
    padding: 0.7rem 2.5rem 0.7rem 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-weight: 600;
    font-size: var(--fs-sm);
    cursor: pointer;
    transition: border-color 0.2s $ease-out;
    @include focus-ring;

    &:hover {
      border-color: var(--color-border-strong);
    }

    option {
      background: var(--color-surface);
      color: var(--color-text);
    }
  }

  &__chevron {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gold);
    pointer-events: none;
  }
}
</style>
