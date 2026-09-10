<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div
      v-if="uiStore.mobileMenuOpen"
      class="drawer-overlay open"
      @click="uiStore.closeMobileMenu()"
    ></div>

    <!-- Drawer Panel -->
    <div
      class="drawer-panel w-80"
      :class="uiStore.mobileMenuOpen ? 'open' : ''"
      aria-label="Mobile navigation"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-brand-border sticky top-0 bg-white z-10">
        <RouterLink to="/" @click="uiStore.closeMobileMenu()" class="flex items-center gap-2">
          <div class="w-8 h-8 flex items-center justify-center rounded-full bg-brand-red">
            <span class="text-white font-black text-xs">B</span>
          </div>
          <span class="text-brand-text font-black tracking-widest text-sm uppercase">B-FIT</span>
        </RouterLink>
        <button @click="uiStore.closeMobileMenu()" class="p-2 text-brand-muted hover:text-brand-text transition-colors rounded-lg" aria-label="Close menu">
          <X :size="20" />
        </button>
      </div>

      <!-- Nav Links -->
      <nav class="p-4 space-y-1">

        <RouterLink to="/" @click="uiStore.closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
          <Home :size="16" class="text-brand-muted" />
          Home
        </RouterLink>

        <!-- Men accordion -->
        <div>
          <button @click="menOpen = !menOpen" class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
            <div class="flex items-center gap-3">
              <Shirt :size="16" class="text-brand-muted" />
              Men's Collection
            </div>
            <ChevronDown :size="15" class="text-brand-muted transition-transform duration-200" :class="menOpen ? 'rotate-180' : ''" />
          </button>
          <div v-if="menOpen" class="ml-7 mt-1 space-y-0.5 border-l-2 border-brand-border pl-4">
            <RouterLink to="/shop/men/t-shirts" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">T-Shirts</RouterLink>
            <RouterLink to="/shop/men/vests-stringers" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Vests &amp; Stringers</RouterLink>
            <RouterLink to="/shop/men/track-suits" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Track Suits</RouterLink>
            <RouterLink to="/shop/men/track-pants-shorts" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Track Pants &amp; Shorts</RouterLink>
            <RouterLink to="/shop/men" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-text font-bold hover:text-brand-red transition-colors">View All Men's →</RouterLink>
          </div>
        </div>

        <!-- Women accordion -->
        <div>
          <button @click="womenOpen = !womenOpen" class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
            <div class="flex items-center gap-3">
              <Shirt :size="16" class="text-brand-muted" />
              Women's Collection
            </div>
            <ChevronDown :size="15" class="text-brand-muted transition-transform duration-200" :class="womenOpen ? 'rotate-180' : ''" />
          </button>
          <div v-if="womenOpen" class="ml-7 mt-1 space-y-0.5 border-l-2 border-brand-border pl-4">
            <RouterLink to="/shop/women/t-shirts" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">T-Shirts</RouterLink>
            <RouterLink to="/shop/women/sports-bras" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Sports Bras</RouterLink>
            <RouterLink to="/shop/women/leggings" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Leggings</RouterLink>
            <RouterLink to="/shop/women/track-pants" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Track Pants</RouterLink>
            <RouterLink to="/shop/women" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-text font-bold hover:text-brand-red transition-colors">View All Women's →</RouterLink>
          </div>
        </div>

        <!-- Accessories accordion -->
        <div>
          <button @click="accOpen = !accOpen" class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
            <div class="flex items-center gap-3">
              <Package :size="16" class="text-brand-muted" />
              Accessories
            </div>
            <ChevronDown :size="15" class="text-brand-muted transition-transform duration-200" :class="accOpen ? 'rotate-180' : ''" />
          </button>
          <div v-if="accOpen" class="ml-7 mt-1 space-y-0.5 border-l-2 border-brand-border pl-4">
            <RouterLink to="/shop/accessories/gym-bags" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Gym Bags</RouterLink>
            <RouterLink to="/shop/accessories/caps" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Caps</RouterLink>
            <RouterLink to="/shop/accessories/bottles" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Bottles</RouterLink>
            <RouterLink to="/shop/accessories/gym-gloves" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Gym Gloves</RouterLink>
            <RouterLink to="/shop/accessories" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-text font-bold hover:text-brand-red transition-colors">View All Accessories →</RouterLink>
          </div>
        </div>

        <!-- Supplements accordion -->
        <div>
          <button @click="supOpen = !supOpen" class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
            <div class="flex items-center gap-3">
              <Zap :size="16" class="text-brand-muted" />
              Supplements
            </div>
            <ChevronDown :size="15" class="text-brand-muted transition-transform duration-200" :class="supOpen ? 'rotate-180' : ''" />
          </button>
          <div v-if="supOpen" class="ml-7 mt-1 space-y-0.5 border-l-2 border-brand-border pl-4">
            <RouterLink to="/shop/supplements/protein" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Protein</RouterLink>
            <RouterLink to="/shop/supplements/pre-workout" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Pre Workout</RouterLink>
            <RouterLink to="/shop/supplements/recovery" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Recovery</RouterLink>
            <RouterLink to="/shop/supplements/vitamins" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-muted hover:text-brand-red transition-colors">Vitamins</RouterLink>
            <RouterLink to="/shop/supplements" @click="uiStore.closeMobileMenu()" class="block py-2 text-sm text-brand-text font-bold hover:text-brand-red transition-colors">View All Supplements →</RouterLink>
          </div>
        </div>

        <RouterLink to="/shop/sale" @click="uiStore.closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-red/8 text-brand-red font-bold transition-all hover:bg-brand-red/15">
          <Tag :size="16" />
          Sale 🔥
        </RouterLink>
      </nav>

      <!-- Divider -->
      <div class="mx-4 border-t border-brand-border"></div>

      <!-- Account Links -->
      <div class="p-4 space-y-1">
        <p class="text-brand-muted text-[10px] tracking-widest uppercase font-semibold px-4 mb-2">Account</p>
        <RouterLink to="/login" @click="uiStore.closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
          <User :size="16" class="text-brand-muted" />
          Login
        </RouterLink>
        <RouterLink to="/wishlist" @click="uiStore.closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
          <Heart :size="16" class="text-brand-muted" />
          Wishlist
          <span v-if="wishlistStore.count > 0" class="ml-auto text-xs bg-brand-red text-white font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{{ wishlistStore.count }}</span>
        </RouterLink>
        <RouterLink to="/contact" @click="uiStore.closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-body font-medium hover:bg-brand-surface hover:text-brand-red transition-all">
          <Phone :size="16" class="text-brand-muted" />
          Contact
        </RouterLink>
      </div>

      <!-- Bottom CTA -->
      <div class="p-4 mt-auto">
        <RouterLink to="/shop" @click="uiStore.closeMobileMenu()" class="btn-primary w-full justify-center">
          Shop All Products
        </RouterLink>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { X, Home, Shirt, ChevronDown, Package, Zap, Tag, User, Heart, Phone } from 'lucide-vue-next'
import { useUiStore } from '../../stores/uiStore.js'
import { useWishlistStore } from '../../stores/wishlistStore.js'

const uiStore = useUiStore()
const wishlistStore = useWishlistStore()

const menOpen = ref(false)
const womenOpen = ref(false)
const accOpen = ref(false)
const supOpen = ref(false)
</script>

<style scoped>
@media (max-width: 767px) {
  .drawer-overlay {
    z-index: 60;
  }

  .drawer-panel {
    z-index: 61;
  }
}
</style>
