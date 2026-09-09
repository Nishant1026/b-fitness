import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isOpen = ref(false)

    const totalItems = computed(() =>
        items.value.reduce((sum, i) => sum + i.quantity, 0)
    )

    const subtotal = computed(() =>
        items.value.reduce((sum, i) => sum + (i.salePrice || i.price) * i.quantity, 0)
    )

    const total = computed(() => subtotal.value)

    function addItem(product, { size, color, quantity = 1 } = {}) {
        const key = `${product.id}-${size}-${color}`
        const existing = items.value.find(i => i.key === key)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.value.push({ ...product, key, size, color, quantity })
        }
        saveToStorage()
        isOpen.value = true
    }

    function removeItem(key) {
        items.value = items.value.filter(i => i.key !== key)
        saveToStorage()
    }

    function updateQuantity(key, quantity) {
        const item = items.value.find(i => i.key === key)
        if (item) {
            if (quantity <= 0) {
                removeItem(key)
            } else {
                item.quantity = quantity
                saveToStorage()
            }
        }
    }

    function clearCart() {
        items.value = []
        saveToStorage()
    }

    function openCart() { isOpen.value = true }
    function closeCart() { isOpen.value = false }
    function toggleCart() { isOpen.value = !isOpen.value }

    function saveToStorage() {
        try {
            localStorage.setItem('bfit_cart', JSON.stringify(items.value))
        } catch { }
    }

    function loadFromStorage() {
        try {
            const stored = localStorage.getItem('bfit_cart')
            if (stored) items.value = JSON.parse(stored)
        } catch { }
    }

    return {
        items, isOpen, totalItems, subtotal, total,
        addItem, removeItem, updateQuantity, clearCart,
        openCart, closeCart, toggleCart, loadFromStorage
    }
})
