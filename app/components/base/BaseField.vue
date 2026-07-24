<script setup lang="ts">
// Labelled input/textarea field with inline error messaging. Uses v-model.
const props = withDefaults(
  defineProps<{
    label: string
    type?: string
    textarea?: boolean
    placeholder?: string
    error?: string
    required?: boolean
    autocomplete?: string
    rows?: number
  }>(),
  { type: 'text', rows: 5 },
)

const model = defineModel<string>({ default: '' })
const id = useId()
const errorId = computed(() => `${id}-error`)
</script>

<template>
  <div class="field" :class="{ 'field--error': !!error }">
    <label :for="id" class="field__label">
      {{ label }}<span v-if="required" class="field__req" aria-hidden="true"> *</span>
    </label>

    <textarea
      v-if="textarea"
      :id="id"
      v-model="model"
      class="field__control field__control--area"
      :rows="rows"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      class="field__control"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
    />

    <p v-if="error" :id="errorId" class="field__error" role="alert">
      <BaseIcon name="close" :size="13" />
      {{ error }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  &__label {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-muted);
  }

  &__req {
    color: var(--color-gold);
  }

  &__control {
    width: 100%;
    padding: 0.85rem 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-size: var(--fs-body);
    transition: border-color 0.2s $ease-out, box-shadow 0.2s $ease-out;
    @include focus-ring;

    &::placeholder {
      color: var(--color-text-dim);
    }

    &:hover {
      border-color: var(--color-border-strong);
    }

    &:focus {
      border-color: var(--color-gold);
    }

    &--area {
      resize: vertical;
      min-height: 8rem;
      line-height: 1.6;
    }
  }

  &--error &__control {
    border-color: var(--color-danger);
  }

  &__error {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: var(--fs-sm);
    color: var(--color-danger);
  }
}
</style>
