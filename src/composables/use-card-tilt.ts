import { onMounted, onUnmounted, ref } from 'vue'

export function useCardTilt() {
  const isReducedMotion = ref(false)
  let mediaQuery: MediaQueryList | undefined

  function updateReducedMotion(): void {
    isReducedMotion.value = Boolean(mediaQuery?.matches)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    updateReducedMotion()
    mediaQuery.addEventListener('change', updateReducedMotion)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', updateReducedMotion)
  })

  function resetElement(element: HTMLElement | null): void {
    element?.style.setProperty('--tilt-x', '0deg')
    element?.style.setProperty('--tilt-y', '0deg')
    element?.style.setProperty('--tilt-lift', '0px')
  }

  function handlePointerMove(event: PointerEvent): void {
    if (isReducedMotion.value || event.pointerType === 'touch') {
      resetElement(event.currentTarget as HTMLElement | null)
      return
    }

    const element = event.currentTarget as HTMLElement | null
    if (!element) {
      return
    }

    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    const rotateX = Math.max(-3, Math.min(3, y * -6))
    const rotateY = Math.max(-3, Math.min(3, x * 6))

    element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    element.style.setProperty('--tilt-lift', '-4px')
  }

  function resetTilt(event: PointerEvent): void {
    resetElement(event.currentTarget as HTMLElement | null)
  }

  return { handlePointerMove, resetTilt }
}
