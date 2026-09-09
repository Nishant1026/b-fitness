<template>
  <section class="py-20 md:py-28 bg-brand-surface overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
      <div class="reveal flex items-end justify-between">
        <div>
          <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-semibold mb-2">Top Sellers</p>
          <h2 class="font-display text-brand-text text-4xl md:text-5xl tracking-wide uppercase">Bestsellers</h2>
          <p class="text-brand-muted text-sm mt-3 max-w-xl">Our most loved products — chosen by thousands of athletes who demand the best.</p>
        </div>
        <RouterLink to="/shop" class="hidden md:flex items-center gap-1.5 text-brand-muted hover:text-brand-red text-sm font-medium transition-colors group">
          View All <ArrowRight :size="15" class="group-hover:translate-x-1 transition-transform duration-300" />
        </RouterLink>
      </div>
    </div>
    <ProductCarousel :products="productStore.bestsellers" title="" tagline="" view-all-link="/shop" />
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import ProductCarousel from './ProductCarousel.vue'
import { useProductStore } from '../../stores/productStore.js'

const productStore = useProductStore()
</script>
