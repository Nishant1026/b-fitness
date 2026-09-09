import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(strength = 0.3) {
    const offset = ref(0)
    let ticking = false

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                offset.value = window.scrollY * strength
                ticking = false
            })
            ticking = true
        }
    }

    onMounted(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.addEventListener('scroll', onScroll, { passive: true })
        }
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })

    return { offset }
}

export default useParallax
