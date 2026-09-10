<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <!-- Banner -->
    <div class="bg-brand-surface border-b border-brand-border py-6 md:py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb :items="[{ label: 'Shop', to: '/shop' }, { label: 'Exclusive Offers' }]" class="mb-3" />
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2.5 mb-1">
              <span class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-brand-red">
                <Tag :size="18" />
              </span>
              <h1 class="text-brand-text font-black text-2xl md:text-3xl">Exclusive Sale & Deals</h1>
            </div>
            <p class="text-brand-muted text-sm">Showing {{ sortedOffers.length }} Deals Available</p>
          </div>
          <select v-model="sortKey" class="input-premium text-sm py-2 px-3 pr-8 min-w-[180px]">
            <option value="discount">Biggest Discount</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-7">

        <!-- Sidebar -->
        <aside class="hidden md:block flex-shrink-0 w-56 lg:w-64">
          <div class="bg-white border border-brand-border rounded-2xl p-5 sticky top-24 shadow-sm">
            <!-- Offer highlights -->
            <div class="mb-5">
              <h4 class="text-brand-text font-bold text-sm tracking-wide mb-3">Active Offers</h4>
              <div class="space-y-2">
                <div v-for="badge in offerHighlights" :key="badge.text"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-red/10 border border-brand-red/25 text-brand-red text-xs font-bold">
                  <Flame :size="13" />
                  {{ badge.text }}
                </div>
              </div>
            </div>
            <div class="border-t border-brand-border pt-5">
              <ProductFilters />
            </div>
          </div>
        </aside>

        <!-- Products -->
        <div class="flex-1 min-w-0">
          <!-- Mobile filter bar -->
          <div class="md:hidden flex items-center gap-3 mb-5">
            <button @click="mobileFiltersOpen = true"
              class="flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border rounded-xl text-brand-body hover:text-brand-red text-sm font-medium transition-colors shadow-sm">
              <SlidersHorizontal :size="15" />
              Filters
            </button>
            <select v-model="sortKey" class="flex-1 input-premium text-sm py-2 px-3">
              <option value="discount">Biggest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <!-- Product Grid (Strictly 2 columns on mobile) -->
          <ProductGrid :products="sortedOffers" columns="3" />
        </div>
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <Teleport to="body">
      <div v-if="mobileFiltersOpen" class="drawer-overlay open" @click="mobileFiltersOpen = false"></div>
      <div class="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r border-brand-border transform transition-transform duration-300 ease-premium overflow-y-auto shadow-2xl"
        :class="mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex items-center justify-between px-5 py-4 border-b border-brand-border sticky top-0 bg-white z-10">
          <h3 class="text-brand-text font-bold text-base">Filters</h3>
          <button @click="mobileFiltersOpen = false" class="text-brand-muted hover:text-brand-text transition-colors" aria-label="Close">
            <X :size="20" />
          </button>
        </div>
        <div class="p-5"><ProductFilters /></div>
      </div>
    </Teleport>

    <Footer />

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="uiStore.notification"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-brand-dark text-white text-sm font-medium shadow-card flex items-center gap-2.5 whitespace-nowrap">
          <CheckCircle :size="15" class="text-green-400 flex-shrink-0" />
          {{ uiStore.notification.message }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Tag, Flame, SlidersHorizontal, X, CheckCircle } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import ProductFilters from '../components/product/ProductFilters.vue'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import { useProductStore } from '../stores/productStore.js'
import { useUiStore } from '../stores/uiStore.js'

const productStore = useProductStore()
const uiStore = useUiStore()
const sortKey = ref('discount')
const mobileFiltersOpen = ref(false)

const sortedOffers = computed(() => {
  const base = productStore.offerProducts
  switch (sortKey.value) {
    case 'discount': return [...base].sort((a, b) => (b.discount || 0) - (a.discount || 0))
    case 'price-low': return [...base].sort((a, b) => (a.price || a.salePrice) - (b.price || b.salePrice))
    case 'price-high': return [...base].sort((a, b) => (b.price || b.salePrice) - (a.price || a.salePrice))
    case 'rating': return [...base].sort((a, b) => b.rating - a.rating)
    default: return base
  }
})

const offerHighlights = [
  { text: 'Up to 33% Off Performance Apparel' },
  { text: 'Free Express Shipping Above Rs. 999' },
  { text: 'Limited Stock Handpicked Deals' },
]
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }
</style>
