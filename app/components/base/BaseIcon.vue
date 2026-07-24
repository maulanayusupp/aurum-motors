<script setup lang="ts">
// Renders a centralized icon (see utils/iconPaths). Line icons stroke; brand
// glyphs fill. Colour is inherited via currentColor. `size` is in px.
import { iconPaths } from '~/utils/iconPaths'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    label?: string
    strokeWidth?: number
  }>(),
  { size: 24, strokeWidth: 1.6 },
)

const def = computed(() => iconPaths[props.name])
const isFill = computed(() => def.value?.mode === 'fill')
const decorative = computed(() => !props.label)
</script>

<template>
  <svg
    v-if="def"
    class="icon"
    :class="{ 'icon--fill': isFill }"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :fill="isFill ? 'currentColor' : 'none'"
    :stroke="isFill ? 'none' : 'currentColor'"
    :stroke-width="isFill ? 0 : strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="decorative ? 'presentation' : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="label"
    focusable="false"
    v-html="def.body"
  />
</template>

<style scoped lang="scss">
.icon {
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}
</style>
