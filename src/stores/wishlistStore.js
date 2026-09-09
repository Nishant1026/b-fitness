import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
    const items = ref([])

    const count = computed(() => items.value.length)

    function isInWishlist(productId) {
        return items.value.some(i => i.id === productId)
    }

    function toggleWishlist(product) {
        const idx = items.value.findIndex(i => i.id === product.id)
        if (idx >= 0) {
            items.value.splice(idx, 1)
        } else {
            items.value.push(product)
        }
        saveToStorage()
    }

    function removeItem(productId) {
        items.value = items.value.filter(i => i.id !== productId)
        saveToStorage()
    }

    function saveToStorage() {
        try {
            localStorage.setItem('bfit_wishlist', JSON.stringify(items.value))
        } catch { }
    }

    function loadFromStorage() {
        try {
            const stored = localStorage.getItem('bfit_wishlist')
            if (stored) items.value = JSON.parse(stored)
        } catch { }
    }

    return {
        items, count,
        isInWishlist, toggleWishlist, removeItem, loadFromStorage
    }
})
