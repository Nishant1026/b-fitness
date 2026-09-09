import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileHeaderScroll() {
    const isVisible = ref(true)
    const lastScrollY = ref(0)
    let ticking = false

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentY = window.scrollY
                const delta = currentY - lastScrollY.value

                if (currentY < 60) {
                    isVisible.value = true
                } else if (delta > 4) {
                    isVisible.value = false
                } else if (delta < -4) {
                    isVisible.value = true
                }

                lastScrollY.value = currentY
                ticking = false
            })
            ticking = true
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', onScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })

    return { isVisible }
}

export default useMobileHeaderScroll
