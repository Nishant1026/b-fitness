<template>
  <!-- Horizontal scroll "HOTSELLING" product carousel like fuaark.com -->
  <div class="overflow-hidden">
    <div v-if="title || tagline" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading row -->
      <div class="flex items-end justify-between mb-8 reveal">
        <div>
          <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-semibold mb-2">{{ tagline }}</p>
          <h2 class="font-display text-brand-text text-4xl md:text-5xl tracking-wide uppercase">{{ title }}</h2>
        </div>
        <RouterLink :to="viewAllLink" class="hidden md:flex items-center gap-1.5 text-brand-muted hover:text-brand-red text-sm font-medium transition-colors group">
          View All <ArrowRight :size="15" class="group-hover:translate-x-1 transition-transform duration-300" />
        </RouterLink>
      </div>
    </div>

    <!-- Scrollable track (edge-to-edge) -->
    <div class="relative">
      <div
        ref="scrollEl"
        class="max-w-7xl mx-auto flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-4 sm:px-6 lg:px-8"
        style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;"
      >
        <div
          v-for="product in products"
          :key="product.id"
          style="scroll-snap-align: start; flex: 0 0 220px;"
          class="sm:flex-none"
        >
          <ProductCard :product="product" />
        </div>
        <!-- Right spacer -->
        <div class="flex-shrink-0 w-2"></div>
      </div>

      <!-- Desktop scroll arrows -->
      <button
        @click="scrollLeft"
        class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-brand-border shadow-sm text-brand-body hover:border-brand-red hover:text-brand-red transition-all duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft :size="18" />
      </button>
      <button
        @click="scrollRight"
        class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-brand-border shadow-sm text-brand-body hover:border-brand-red hover:text-brand-red transition-all duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight :size="18" />
      </button>
    </div>

    <!-- Mobile View All -->
    <div class="mt-7 text-center md:hidden px-6">
      <RouterLink :to="viewAllLink" class="btn-secondary text-sm">View All →</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from '../product/ProductCard.vue'

defineProps({
  products:    { type: Array,  required: true },
  title:       { type: String, default: 'Best Sellers' },
  tagline:     { type: String, default: 'Hotselling' },
  viewAllLink: { type: String, default: '/shop' },
})

const scrollEl = ref(null)
const SCROLL_AMOUNT = 700

function scrollLeft()  { scrollEl.value?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }) }
function scrollRight() { scrollEl.value?.scrollBy({ left:  SCROLL_AMOUNT, behavior: 'smooth' }) }
</script>

<style scoped>
.scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
