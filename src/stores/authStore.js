import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)

    const isLoggedIn = computed(() => !!user.value)

    function login(userData, authToken) {
        user.value = userData
        token.value = authToken
        localStorage.setItem('bfit_user', JSON.stringify(userData))
        localStorage.setItem('bfit_token', authToken)
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('bfit_user')
        localStorage.removeItem('bfit_token')
    }

    function loadFromStorage() {
        try {
            const u = localStorage.getItem('bfit_user')
            const t = localStorage.getItem('bfit_token')
            if (u) user.value = JSON.parse(u)
            if (t) token.value = t
        } catch { }
    }

    return { user, token, isLoggedIn, login, logout, loadFromStorage }
})
