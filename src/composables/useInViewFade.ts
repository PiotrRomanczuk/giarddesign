import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Adds the `.reveal` base class behaviour: toggles `.in-view` once the element
 * scrolls into the viewport, triggering the fade/slide-up transition defined in style.css.
 */
export function useInViewFade(target: Ref<HTMLElement | null>, options: IntersectionObserverInit = {}) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())
}
