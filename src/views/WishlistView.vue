<template>
  <div class="min-h-screen bg-brand-black">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="flex items-center gap-4 mb-10">
        <Heart :size="28" class="text-brand-red" />
        <div>
          <h1 class="text-brand-white font-black text-3xl md:text-4xl">My Wishlist</h1>
          <p class="text-brand-silver/50 text-sm mt-1">{{ wishlistStore.count }} saved {{ wishlistStore.count === 1 ? 'item' : 'items' }}</p>
        </div>
      </div>

      <!-- Wishlist Grid -->
      <div v-if="wishlistStore.items.length > 0">
        <ProductGrid :products="wishlistStore.items" />
      </div>

      <!-- Empty Wishlist -->
      <div v-else class="py-28 text-center">
        <Heart :size="56" class="mx-auto text-brand-silver/15 mb-6" />
        <h2 class="text-brand-white font-bold text-2xl mb-3">Your wishlist is empty</h2>
        <p class="text-brand-silver/50 text-base mb-8">Save items you love and come back to them any time.</p>
        <RouterLink to="/shop" class="btn-primary">Browse Collection</RouterLink>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { Heart } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import { useWishlistStore } from '../stores/wishlistStore.js'

const wishlistStore = useWishlistStore()
</script>
