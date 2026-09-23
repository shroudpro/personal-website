import { onMounted, onUnmounted, ref, type Ref } from 'vue'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useRevealOnScroll(
  root: Ref<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const isReducedMotion = ref(false)
  let observer: IntersectionObserver | undefined
  let mediaQuery: MediaQueryList | undefined

  function updateReducedMotion(): void {
    isReducedMotion.value = Boolean(mediaQuery?.matches)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    updateReducedMotion()
    mediaQuery.addEventListener('change', updateReducedMotion)

    const elements = root.value?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements?.length) {
      return
    }

    if (isReducedMotion.value || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        })
      },
      {
        threshold: options.threshold ?? 0.16,
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
      },
    )

    elements.forEach((element) => observer?.observe(element))
  })

  onUnmounted(() => {
    observer?.disconnect()
    mediaQuery?.removeEventListener('change', updateReducedMotion)
  })

  return { isReducedMotion }
}
