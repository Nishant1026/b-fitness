<template>
  <div class="space-y-6">

    <!-- Search Product -->
    <div>
      <h4 class="text-brand-text font-bold text-sm tracking-wide mb-3">Search Product</h4>
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" :size="15" />
        <input
          v-model="productStore.searchQuery"
          type="text"
          placeholder="Search product, SKU..."
          class="input-premium pl-9 text-sm w-full"
        />
      </div>
    </div>

    <div class="border-t border-brand-border"></div>

    <!-- Filter By Price -->
    <div>
      <h4 class="text-brand-text font-bold text-sm tracking-wide mb-3">Filter By Price</h4>
      <div class="space-y-2">
        <label
          v-for="range in priceRanges"
          :key="range.label"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="radio"
            name="priceRange"
            :value="range.value"
            v-model="selectedPriceRange"
            class="sr-only"
          />
          <div class="w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
            :class="selectedPriceRange === range.value
              ? 'bg-brand-red border-brand-red'
              : 'border-brand-border-2 group-hover:border-brand-muted'"
          >
            <div v-if="selectedPriceRange === range.value" class="w-1.5 h-1.5 bg-white rounded-sm"></div>
          </div>
          <span class="text-brand-body group-hover:text-brand-text text-sm transition-colors">{{ range.label }}</span>
        </label>
      </div>
    </div>

    <div class="border-t border-brand-border"></div>

    <!-- Customer Rating -->
    <div>
      <h4 class="text-brand-text font-bold text-sm tracking-wide mb-3">Customer Rating</h4>
      <div class="space-y-2">
        <label
          v-for="r in ratingOptions"
          :key="r.value"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="radio"
            name="rating"
            :value="r.value"
            v-model="productStore.minRating"
            class="sr-only"
          />
          <div class="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
            :class="productStore.minRating === r.value
              ? 'border-brand-red'
              : 'border-brand-border-2 group-hover:border-brand-muted'"
          >
            <div v-if="productStore.minRating === r.value" class="w-2 h-2 rounded-full bg-brand-red"></div>
          </div>
          <div class="flex items-center gap-1.5">
            <div v-if="r.value > 0" class="flex gap-0.5">
              <Star v-for="i in 5" :key="i" :size="11"
                :class="i <= r.value ? 'text-brand-gold fill-brand-gold' : 'text-brand-border-2'"
              />
            </div>
            <span class="text-brand-body text-xs">{{ r.label }}</span>
          </div>
        </label>
      </div>
    </div>

    <div class="border-t border-brand-border"></div>

    <!-- Categories -->
    <div>
      <h4 class="text-brand-text font-bold text-sm tracking-wide mb-3">Categories</h4>
      <div class="space-y-1">
        <button
          @click="selectCategory('')"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="!activeCatSlug
            ? 'bg-brand-red text-white'
            : 'text-brand-body hover:text-brand-red hover:bg-brand-surface'"
        >
          <span>All Products</span>
          <ChevronRight :size="14" />
        </button>
        <button
          v-for="cat in filterCategories"
          :key="cat.slug"
          @click="selectCategory(cat.slug)"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="activeCatSlug === cat.slug
            ? 'bg-brand-red text-white'
            : 'text-brand-body hover:text-brand-red hover:bg-brand-surface'"
        >
          <span>{{ cat.name }}</span>
          <ChevronRight :size="14" />
        </button>
      </div>
    </div>

    <div class="border-t border-brand-border"></div>

    <!-- Reset -->
    <button @click="resetAll" class="w-full flex items-center justify-center gap-2 py-2.5 border border-brand-border rounded-xl text-brand-muted hover:text-brand-red hover:border-brand-red text-xs font-semibold tracking-widest uppercase transition-all duration-300">
      <RotateCcw :size="12" />
      Reset All Filters
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Star, ChevronRight, RotateCcw } from 'lucide-vue-next'
import { useProductStore } from '../../stores/productStore.js'
import { categories } from '../../data/categories.js'

const router = useRouter()
const productStore = useProductStore()

const selectedPriceRange = ref('all')

const priceRanges = [
  { label: 'All Prices',          value: 'all' },
  { label: 'Rs. 0 – Rs. 500',     value: '0-500' },
  { label: 'Rs. 501 – Rs. 1000',  value: '501-1000' },
  { label: 'Rs. 1001 – Rs. 2000', value: '1001-2000' },
  { label: 'Rs. 2001 – Rs. 3500', value: '2001-3500' },
  { label: 'Above Rs. 3500',      value: '3501-99999' },
]

const ratingOptions = [
  { value: 5, label: '★★★★★ 5 Stars' },
  { value: 4, label: '★★★★ & Above' },
  { value: 2, label: '★★ & Above' },
  { value: 0, label: 'All Ratings' },
]

const filterCategories = computed(() => [
  ...categories,
  { id: 99, name: 'Sale 🔥', slug: 'sale' }
])

const activeCatSlug = computed(() => {
  if (!productStore.activeCategory) return ''
  const cat = productStore.activeCategory.toLowerCase().trim()
  if (cat === 'men') return 'men'
  if (cat === 'women') return 'women'
  if (cat === 'accessories') return 'accessories'
  if (cat === 'supplements') return 'supplements'
  if (cat === 'sale') return 'sale'
  const match = categories.find(c => c.name.toLowerCase() === cat || c.slug === cat)
  return match ? match.slug : cat
})

function selectCategory(slug) {
  if (!slug) {
    productStore.activeCategory = ''
    productStore.activeSubCategory = ''
    router.push('/shop')
  } else {
    productStore.activeCategory = slug
    productStore.activeSubCategory = ''
    router.push(`/shop/${slug}`)
  }
}

watch(selectedPriceRange, (val) => {
  if (!val || val === 'all') {
    productStore.priceRange = [0, 99999]
    return
  }
  const [min, max] = val.split('-').map(Number)
  productStore.priceRange = [min, max]
})

function resetAll() {
  selectedPriceRange.value = 'all'
  productStore.resetFilters()
  router.push('/shop')
}
</script>
