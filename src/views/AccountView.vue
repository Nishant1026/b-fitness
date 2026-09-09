<template>
  <div class="min-h-screen bg-brand-black">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 class="text-brand-white font-black text-3xl md:text-4xl mb-4">My Account</h1>

      <!-- Profile Card -->
      <div class="grid md:grid-cols-2 gap-8 max-w-2xl">
        <div class="bg-brand-charcoal rounded border border-white/[0.06] p-7">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-full bg-brand-gray flex items-center justify-center">
              <User :size="24" class="text-brand-silver/60" />
            </div>
            <div>
              <p class="text-brand-white font-bold text-lg">{{ authStore.user?.name || 'Guest' }}</p>
              <p class="text-brand-silver/50 text-sm">{{ authStore.user?.email || 'Not signed in' }}</p>
            </div>
          </div>
          <RouterLink to="/wishlist" class="flex items-center gap-3 py-3 border-t border-white/[0.06] text-brand-silver/70 hover:text-brand-white transition-colors text-sm">
            <Heart :size="16" /> Wishlist ({{ wishlistStore.count }})
          </RouterLink>
          <RouterLink to="/cart" class="flex items-center gap-3 py-3 border-t border-white/[0.06] text-brand-silver/70 hover:text-brand-white transition-colors text-sm">
            <ShoppingBag :size="16" /> Cart ({{ cartStore.totalItems }})
          </RouterLink>
          <button @click="authStore.logout(); $router.push('/')" class="flex items-center gap-3 w-full text-left py-3 border-t border-white/[0.06] text-brand-silver/70 hover:text-brand-red transition-colors text-sm">
            <LogOut :size="16" /> Sign Out
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { User, Heart, ShoppingBag, LogOut } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import { useAuthStore } from '../stores/authStore.js'
import { useWishlistStore } from '../stores/wishlistStore.js'
import { useCartStore } from '../stores/cartStore.js'

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
</script>
