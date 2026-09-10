<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />

    <!-- Header spacer -->
    <div class="h-16 md:h-25"></div>

    <!-- Page Banner + Breadcrumb -->
    <div class="bg-brand-surface border-b border-brand-border py-6 md:py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb :items="breadcrumbs" class="mb-3" />
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1 class="text-brand-text font-black text-2xl md:text-3xl">{{ pageTitle }}</h1>
            <p class="text-brand-muted text-sm mt-1">
              Showing {{ productStore.filteredProducts.length }} Products
            </p>
          </div>
          <!-- Sort -->
          <div class="flex items-center gap-2">
            <label class="text-brand-muted text-sm flex-shrink-0">Sort:</label>
            <select v-model="productStore.sortBy" class="input-premium text-sm py-2 px-3 pr-8 min-w-[180px]">
              <option value="featured">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-7">

        <!-- Sidebar (Desktop) -->
        <aside class="hidden md:block flex-shrink-0 w-56 lg:w-64">
          <div class="bg-white border border-brand-border rounded-xl p-5 sticky top-24 shadow-sm">
            <ProductFilters />
          </div>
        </aside>

        <!-- Products Area -->
        <div class="flex-1 min-w-0">
          <!-- Mobile Filter + Sort bar -->
          <div class="md:hidden flex items-center gap-3 mb-5">
            <button @click="mobileFiltersOpen = true"
              class="flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border rounded-xl text-brand-body hover:text-brand-red text-sm font-medium transition-colors shadow-sm">
              <SlidersHorizontal :size="15" />
              Filters
            </button>
            <select v-model="productStore.sortBy" class="flex-1 input-premium text-sm py-2 px-3">
              <option value="featured">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <!-- Product Grid (Strictly 2 columns on mobile) -->
          <ProductGrid :products="productStore.filteredProducts" columns="3" />
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
          <button @click="mobileFiltersOpen = false" class="text-brand-muted hover:text-brand-text transition-colors p-1 rounded-lg" aria-label="Close filters">
            <X :size="20" />
          </button>
        </div>
        <div class="p-5">
          <ProductFilters />
        </div>
        <div class="sticky bottom-0 p-4 bg-white border-t border-brand-border">
          <button @click="mobileFiltersOpen = false" class="btn-primary w-full justify-center">
            Apply ({{ productStore.filteredProducts.length }} products)
          </button>
        </div>
      </div>
    </Teleport>

    <Footer />

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="uiStore.notification" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-brand-dark text-white text-sm font-medium shadow-card flex items-center gap-2.5 whitespace-nowrap">
          <CheckCircle :size="15" class="text-green-400 flex-shrink-0" />
          {{ uiStore.notification.message }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { SlidersHorizontal, X, CheckCircle } from 'lucide-vue-next'
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
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { categories } from '../data/categories.js'

const route = useRoute()
const productStore = useProductStore()
const uiStore = useUiStore()
const { refresh } = useScrollReveal()
const mobileFiltersOpen = ref(false)

const subcategoryMap = {
  't-shirts': 'T-Shirts',
  'vests-stringers': 'Vests & Stringers',
  'track-suits': 'Track Suits',
  'track-pants-shorts': 'Track Pants & Shorts',
  'track-pants': 'Track Pants',
  'sports-bras': 'Sports Bras',
  'leggings': 'Leggings',
  'shorts': 'Shorts',
  'hoodies': 'Hoodies',
  'sweatshirts': 'Sweatshirts',
  'jackets': 'Jackets',
  'gym-bags': 'Gym Bags',
  'caps': 'Caps',
  'socks': 'Socks',
  'gym-gloves': 'Gym Gloves',
  'belts': 'Belts',
  'bottles': 'Bottles',
  'towels': 'Towels',
  'protein': 'Protein',
  'pre-workout': 'Pre Workout',
  'recovery': 'Recovery',
  'vitamins': 'Vitamins',
  'performance': 'Performance'
}

function formatSubcategory(slug) {
  if (!slug) return ''
  if (subcategoryMap[slug]) return subcategoryMap[slug]
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const categorySlug = computed(() => (route.params.category || '').toLowerCase())
const subcategorySlug = computed(() => (route.params.subcategory || '').toLowerCase())

const categoryName = computed(() => {
  if (!categorySlug.value) return 'All Products'
  if (categorySlug.value === 'men') return "Men's Collection"
  if (categorySlug.value === 'women') return "Women's Collection"
  if (categorySlug.value === 'accessories') return 'Gym Accessories'
  if (categorySlug.value === 'supplements') return 'Sports Supplements'
  if (categorySlug.value === 'sale') return 'Sale & Special Offers'

  const found = categories.find(c => c.slug === categorySlug.value)
  return found ? found.name : categorySlug.value.charAt(0).toUpperCase() + categorySlug.value.slice(1)
})

const pageTitle = computed(() => {
  if (subcategorySlug.value) {
    const formatted = formatSubcategory(subcategorySlug.value)
    if (categorySlug.value === 'men') return `Men's ${formatted}`
    if (categorySlug.value === 'women') return `Women's ${formatted}`
    return formatted
  }
  return categoryName.value
})

const breadcrumbs = computed(() => {
  const arr = [{ label: 'Shop', to: '/shop' }]
  if (categorySlug.value && subcategorySlug.value) {
    arr.push({ label: categoryName.value, to: `/shop/${categorySlug.value}` })
    arr.push({ label: formatSubcategory(subcategorySlug.value) })
  } else if (categorySlug.value) {
    arr.push({ label: categoryName.value })
  }
  return arr
})

watch([() => route.params.category, () => route.params.subcategory], ([cat, sub]) => {
  productStore.activeCategory = cat ? cat.toLowerCase() : ''
  productStore.activeSubCategory = sub ? sub.toLowerCase() : ''
  setTimeout(refresh, 300)
}, { immediate: true })

onMounted(() => setTimeout(refresh, 400))
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }
</style>
