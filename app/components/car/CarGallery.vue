<script setup lang="ts">
// Detail-page gallery: a large active image + a thumbnail strip. Keyboard
// accessible (thumbnails are buttons); active image updates on select.
const props = defineProps<{ images: string[]; alt: string }>()

const active = ref(0)
watch(() => props.images, () => (active.value = 0))

const select = (i: number) => (active.value = i)
</script>

<template>
  <div class="gallery">
    <div class="gallery__main">
      <img
        :src="images[active]"
        :alt="alt"
        class="gallery__img"
        width="1400"
        height="933"
        decoding="async"
      />
      <div class="gallery__glow" aria-hidden="true" />
    </div>

    <div v-if="images.length > 1" class="gallery__thumbs" role="tablist">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="gallery__thumb"
        :class="{ 'is-active': i === active }"
        role="tab"
        :aria-selected="i === active"
        :aria-label="`${alt} — ${i + 1}`"
        @click="select(i)"
      >
        <img :src="img" :alt="''" loading="lazy" decoding="async" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  &__main {
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: fade 0.5s $ease-out;
  }

  &__glow {
    position: absolute;
    inset: auto 0 -30% 0;
    height: 50%;
    background: radial-gradient(ellipse at center, var(--color-gold-glow), transparent 70%);
    filter: blur(24px);
    pointer-events: none;
  }

  &__thumbs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 0.7rem;
  }

  &__thumb {
    aspect-ratio: 16 / 11;
    border-radius: var(--radius-sm);
    overflow: hidden;
    border: 2px solid transparent;
    opacity: 0.6;
    transition: opacity 0.25s $ease-out, border-color 0.25s $ease-out, transform 0.25s;
    @include focus-ring;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    &.is-active {
      opacity: 1;
      border-color: var(--color-gold);
    }
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
    transform: scale(1.02);
  }
}
</style>
