import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isOpen = ref(false)

    const totalItems = computed(() =>
        items.value.reduce((sum, i) => sum + i.quantity, 0)
    )

    const subtotal = computed(() =>
        items.value.reduce((sum, i) => sum + (i.price || i.salePrice) * i.quantity, 0)
    )

    const originalSubtotal = computed(() =>
        items.value.reduce((sum, i) => sum + (i.originalPrice || i.price || i.salePrice) * i.quantity, 0)
    )

    const totalDiscount = computed(() =>
        Math.max(0, originalSubtotal.value - subtotal.value)
    )

    const shipping = computed(() =>
        subtotal.value >= 999 || items.value.length === 0 ? 0 : 99
    )

    const total = computed(() =>
        subtotal.value + shipping.value
    )

    function addItem(product, { size = '', color = '', quantity = 1 } = {}) {
        const itemSize = size || ''
        const itemColor = color || ''
        const key = `${product.id}-${itemSize}-${itemColor}`
        const existing = items.value.find(i => i.key === key)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.value.push({
                id: product.id,
                name: product.name,
                slug: product.slug,
                category: product.category,
                subcategory: product.subcategory,
                categoryName: product.categoryName,
                price: product.price || product.salePrice,
                originalPrice: product.originalPrice || product.price,
                thumbnail: product.thumbnail || product.images?.[0],
                sku: product.sku,
                key,
                size: itemSize,
                color: itemColor,
                quantity
            })
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
        items, isOpen, totalItems, subtotal, originalSubtotal, totalDiscount, shipping, total,
        addItem, removeItem, updateQuantity, clearCart,
        openCart, closeCart, toggleCart, loadFromStorage
    }
})
