<template>
  <!-- ==================== ULTRA-LUXURY GLASSMORPHISM TOP SUB-HEADER BAR ==================== -->
  <div class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-neutral-950/80 text-white text-[11px] font-medium border-b border-white/10 hidden md:block shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
      
      <!-- Left: Contact Information & Support -->
      <div class="flex items-center gap-6">
        <a href="tel:+919876543210" class="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
          <div class="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
            <Phone :size="15" class="text-red-500" />
          </div>
          <span class="tracking-wide">Support: +91 98765 43210</span>
        </a>
        <span class="text-white/20">|</span>
        <a href="mailto:support@bfitathletics.com" class="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
          <div class="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
            <Mail :size="15" class="text-red-500" />
          </div>
          <span class="tracking-wide">support@bfitathletics.com</span>
        </a>
      </div>

      <!-- Center: Glass Ticker Announcement -->
      <div class="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 shadow-inner">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <span class="font-bold tracking-wider uppercase text-white">Free Express Shipping</span>
        <span class="text-white/60 font-normal">on orders above Rs. 1,999</span>
      </div>

      <!-- Right: Quick Links with 15px Icons -->
      <div class="flex items-center gap-6 font-semibold">
        <RouterLink to="/track-order" class="flex items-center gap-1.5 text-white/90 hover:text-white tracking-wider transition-colors">
          <Truck :size="15" class="text-white/70" /> Track Order
        </RouterLink>
        <span class="text-white/20">|</span>
        <RouterLink to="/stores" class="flex items-center gap-1.5 text-white/90 hover:text-white tracking-wider transition-colors">
          <MapPin :size="15" class="text-white/70" /> Store Locator
        </RouterLink>
      </div>

    </div>
  </div>

  <!-- ==================== MAIN STICKY GLASS HEADER ==================== -->
  <header
    class="fixed top-0 md:top-10 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/85 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">

      <!-- Left: Mobile Toggle & Premium Brand Logo -->
      <div class="flex items-center gap-3">
        <!-- Mobile Menu Trigger -->
        <button
          type="button"
          @click="uiStore.openMobileMenu()"
          class="md:hidden p-2.5 text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
          aria-label="Open Menu"
        >
          <Menu :size="20" />
        </button>

        <!-- Redesigned High-End Brand Logo -->
        <RouterLink to="/" class="flex items-center gap-3.5 group py-1" aria-label="B-FIT Home">
          <div class="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-xl shadow-neutral-900/15 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <span class="absolute inset-0 bg-gradient-to-tr from-neutral-900 to-neutral-700"></span>
            <span class="relative font-black text-lg tracking-tighter">B</span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="text-neutral-900 font-black text-base tracking-[0.2em] uppercase leading-none">B-FIT</span>
              <span class="w-1.5 h-1.5 rounded-full bg-red-600 mb-0.5"></span>
            </div>
            <span class="text-neutral-400 text-[9px] tracking-[0.3em] uppercase font-bold mt-1">Athletics &amp; Labs</span>
          </div>
        </RouterLink>
      </div>

      <!-- Center: Clean Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
        <RouterLink to="/" class="relative py-2 text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-neutral-900 transition-colors group">
          Home
          <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>

        <!-- Men Dropdown -->
        <div class="relative group/men py-2">
          <button type="button" class="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-neutral-800 group-hover/men:text-neutral-900 transition-colors">
            Men <ChevronDown :size="15" class="transition-transform duration-300 group-hover/men:rotate-180" />
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-neutral-200/90 rounded-2xl shadow-xl p-2 opacity-0 pointer-events-none group-hover/men:opacity-100 group-hover/men:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/men:translate-y-0 z-50">
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">T-Shirts</RouterLink>
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Vests &amp; Stringers</RouterLink>
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Track Suits</RouterLink>
            <RouterLink to="/shop/performance-bottomwear" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Track Pants &amp; Shorts</RouterLink>
            <div class="my-1.5 border-t border-neutral-100"></div>
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2 text-xs text-neutral-900 font-bold hover:translate-x-1 transition-transform">View All Men's →</RouterLink>
          </div>
        </div>

        <!-- Women Dropdown -->
        <div class="relative group/women py-2">
          <button type="button" class="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-neutral-800 group-hover/women:text-neutral-900 transition-colors">
            Women <ChevronDown :size="15" class="transition-transform duration-300 group-hover/women:rotate-180" />
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-neutral-200/90 rounded-2xl shadow-xl p-2 opacity-0 pointer-events-none group-hover/women:opacity-100 group-hover/women:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/women:translate-y-0 z-50">
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Performance Tees</RouterLink>
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Track Suits</RouterLink>
            <RouterLink to="/shop/performance-bottomwear" class="block px-3.5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all">Bottoms &amp; Leggings</RouterLink>
            <div class="my-1.5 border-t border-neutral-100"></div>
            <RouterLink to="/shop/sports-clothing" class="block px-3.5 py-2 text-xs text-neutral-900 font-bold hover:translate-x-1 transition-transform">View All Women's →</RouterLink>
          </div>
        </div>

        <RouterLink to="/shop/gym-accessories" class="relative py-2 text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-neutral-900 transition-colors group">
          Accessories
          <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>

        <RouterLink to="/shop/sports-supplements" class="relative py-2 text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-neutral-900 transition-colors group">
          Supplements
          <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>

        <!-- Sale button -->
        <RouterLink to="/offers" class="px-3.5 py-1 bg-red-50 text-red-600 border border-red-200/60 text-xs uppercase tracking-widest font-black rounded-full hover:bg-red-100 transition-colors">
          Sale
        </RouterLink>
      </nav>

      <!-- Right Actions & Search Bar -->
      <div class="flex items-center gap-2">
        <!-- Desktop Search Input -->
        <div class="hidden lg:flex relative w-60 xl:w-72">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" :size="15" />
          <input
            v-model="searchQuery"
            @keyup.enter="doSearch"
            @focus="searchFocused = true"
            @blur="setTimeout(() => { searchFocused = false }, 200)"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2 bg-neutral-100/70 border border-neutral-200 rounded-full text-neutral-900 placeholder:text-neutral-400 text-xs font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-inner"
          />
          <!-- Inline Dropdown Results -->
          <div
            v-if="searchFocused && searchResults.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
          >
            <RouterLink
              v-for="p in searchResults.slice(0, 5)"
              :key="p.id"
              :to="`/product/${p.slug}`"
              @click="searchQuery = ''; searchFocused = false"
              class="flex items-center gap-3 p-2.5 hover:bg-neutral-50 transition-all rounded-xl group border-b border-neutral-100 last:border-0"
            >
              <img :src="p.thumbnail" :alt="p.name" class="w-9 h-9 object-cover rounded-lg bg-neutral-100 flex-shrink-0" loading="lazy" />
              <div class="flex-1 min-w-0">
                <p class="text-neutral-900 text-xs font-bold group-hover:text-red-600 transition-colors truncate">{{ p.name }}</p>
                <p class="text-neutral-400 text-[10px] uppercase tracking-wider">{{ p.subCategory }}</p>
              </div>
              <span class="text-neutral-900 font-black text-xs flex-shrink-0">Rs. {{ (p.salePrice || p.price).toLocaleString() }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Mobile Search Toggle -->
        <button
          @click="uiStore.openSearch()"
          class="lg:hidden p-2.5 text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors"
          aria-label="Search"
        >
          <Search :size="15" />
        </button>

        <!-- Wishlist -->
        <RouterLink
          to="/wishlist"
          class="relative p-2.5 text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors"
          aria-label="Wishlist"
        >
          <Heart :size="15" />
          <span v-if="wishlistStore.count > 0" class="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-neutral-900 text-white text-[10px] font-black rounded-full px-1">
            {{ wishlistStore.count }}
          </span>
        </RouterLink>

        <!-- Cart -->
        <button
          @click="cartStore.openCart()"
          class="relative p-2.5 text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors"
          aria-label="Shopping Cart"
        >
          <ShoppingBag :size="15" />
          <span v-if="cartStore.totalItems > 0" class="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-neutral-900 text-white text-[10px] font-black rounded-full px-1" :key="cartStore.totalItems">
            {{ cartStore.totalItems }}
          </span>
        </button>

        <!-- Account Button -->
        <RouterLink
          to="/login"
          class="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-all rounded-full text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          <User :size="15" />
          <span class="hidden xl:inline">Account</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- Fullscreen Immersive Search Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="uiStore.searchOpen" class="fixed inset-0 z-[70] bg-white/95 backdrop-blur-2xl flex flex-col items-center pt-32 px-6">
        <button @click="uiStore.closeSearch()" class="absolute top-8 right-8 p-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close search">
          <X :size="20" />
        </button>
        <div class="w-full max-w-2xl">
          <p class="text-neutral-400 text-xs tracking-[0.25em] uppercase font-bold mb-4 text-center">Search Store Inventory</p>
          <div class="relative">
            <Search class="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" :size="15" />
            <input
              v-model="overlaySearch"
              @keyup.enter="doOverlaySearch"
              type="text"
              placeholder="Search by apparel name, collection, or SKU..."
              class="w-full pl-14 pr-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-base font-semibold focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-xl"
              autofocus
            />
          </div>
          <div v-if="overlayResults.length > 0" class="mt-6 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            <RouterLink
              v-for="p in overlayResults.slice(0, 6)"
              :key="p.id"
              :to="`/product/${p.slug}`"
              @click="uiStore.closeSearch()"
              class="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 transition-all group"
            >
              <img :src="p.thumbnail" :alt="p.name" class="w-12 h-12 object-cover rounded-xl shadow-sm" loading="lazy" />
              <div>
                <div class="text-neutral-900 font-bold text-sm group-hover:text-red-600 transition-colors">{{ p.name }}</div>
                <div class="text-neutral-400 text-xs uppercase tracking-wider">{{ p.subCategory }}</div>
              </div>
              <div class="ml-auto text-neutral-900 font-black text-sm">Rs. {{ (p.salePrice || p.price).toLocaleString() }}</div>
            </RouterLink>
          </div>
          <p v-else-if="overlaySearch.length > 1" class="text-neutral-400 text-center mt-12 text-sm font-medium">No products found matching "{{ overlaySearch }}"</p>
        </div>
      </div>
    </Transition>
  </Teleport>

</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Phone, Mail, Truck, MapPin } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore.js'
import { useWishlistStore } from '../../stores/wishlistStore.js'
import { useUiStore } from '../../stores/uiStore.js'
import { useProductStore } from '../../stores/productStore.js'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const uiStore = useUiStore()
const productStore = useProductStore()

const searchQuery = ref('')
const searchFocused = ref(false)

const searchResults = computed(() => {
  if (!searchQuery.value.trim() || searchQuery.value.length < 2) return []
  const q = searchQuery.value.toLowerCase()
  return productStore.allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subCategory.toLowerCase().includes(q)
  )
})

function doSearch() {
  if (searchQuery.value.trim()) {
    productStore.searchQuery = searchQuery.value
    searchQuery.value = ''
    searchFocused.value = false
  }
}

const overlaySearch = ref('')
const overlayResults = computed(() => {
  if (!overlaySearch.value.trim() || overlaySearch.value.length < 2) return []
  const q = overlaySearch.value.toLowerCase()
  return productStore.allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subCategory.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  )
})

function doOverlaySearch() {
  if (overlaySearch.value.trim()) {
    productStore.searchQuery = overlaySearch.value
    uiStore.closeSearch()
    overlaySearch.value = ''
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>