<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div class="flex items-center gap-3 mb-8">
        <span class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-brand-red">
          <Heart :size="20" class="fill-brand-red text-brand-red" />
        </span>
        <div>
          <h1 class="text-brand-text font-black text-2xl md:text-3xl">My Wishlist</h1>
          <p class="text-brand-muted text-xs sm:text-sm mt-0.5">{{ wishlistStore.count }} saved {{ wishlistStore.count === 1 ? 'item' : 'items' }}</p>
        </div>
      </div>

      <!-- Wishlist Grid (Strictly 2 columns on mobile) -->
      <div v-if="wishlistStore.items.length > 0">
        <ProductGrid :products="wishlistStore.items" columns="4" />
      </div>

      <!-- Empty Wishlist -->
      <div v-else class="py-24 text-center">
        <Heart :size="56" class="mx-auto text-brand-muted/30 mb-4" />
        <h2 class="text-brand-text font-black text-2xl mb-2">Your wishlist is empty</h2>
        <p class="text-brand-muted text-sm sm:text-base mb-8">Save items you love by clicking the heart icon and review them anytime.</p>
        <RouterLink to="/shop" class="btn-primary">Browse All Products</RouterLink>
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
