import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const mobileMenuOpen = ref(false)
    const searchOpen = ref(false)
    const quickViewProduct = ref(null)
    const notification = ref(null)

    function openMobileMenu() {
        mobileMenuOpen.value = true
        document.body.style.overflow = 'hidden'
    }

    function closeMobileMenu() {
        mobileMenuOpen.value = false
        document.body.style.overflow = ''
    }

    function toggleMobileMenu() {
        mobileMenuOpen.value ? closeMobileMenu() : openMobileMenu()
    }

    function openSearch() { searchOpen.value = true }
    function closeSearch() { searchOpen.value = false }

    function setQuickView(product) { quickViewProduct.value = product }
    function closeQuickView() { quickViewProduct.value = null }

    function showNotification(message, type = 'success', duration = 3000) {
        notification.value = { message, type }
        setTimeout(() => { notification.value = null }, duration)
    }

    return {
        mobileMenuOpen, searchOpen, quickViewProduct, notification,
        openMobileMenu, closeMobileMenu, toggleMobileMenu,
        openSearch, closeSearch,
        setQuickView, closeQuickView,
        showNotification
    }
})
