import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
    let observer = null

    function init() {
        if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Instantly show all — respect reduced motion
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                el.classList.add('is-visible')
            })
            return
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.08
        })

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el)
        })
    }

    function refresh() {
        if (!observer) return
        const newElements = document.querySelectorAll('.reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible)')
        newElements.forEach(el => observer.observe(el))
    }

    onMounted(() => {
        setTimeout(init, 100)
    })

    onUnmounted(() => {
        if (observer) observer.disconnect()
    })

    return { init, refresh }
}

export default useScrollReveal
