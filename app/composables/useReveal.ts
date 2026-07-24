// =============================================================================
// useReveal — a tiny scroll-reveal helper built on IntersectionObserver. Adds
// an `is-visible` class the first time an element scrolls into view, so the
// styling stays in SCSS (no inline styles) and respects reduced-motion via CSS.
// SSR-safe: no-ops on the server and when IO is unavailable.
// =============================================================================

export const useReveal = (options: { threshold?: number; once?: boolean } = {}) => {
  const { threshold = 0.16, once = true } = options
  const el = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') {
      el.value?.classList.add('is-visible')
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold },
    )
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { el }
}
