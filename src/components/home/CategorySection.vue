<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <div class="flex items-end justify-between mb-10 reveal">
        <div>
          <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-semibold mb-2">Collections</p>
          <h2 class="font-display text-brand-text text-4xl md:text-5xl tracking-wide uppercase">Shop By Category</h2>
        </div>
        <RouterLink to="/shop" class="hidden md:flex items-center gap-1.5 text-brand-muted hover:text-brand-red text-sm font-medium transition-colors">
          View All <ArrowRight :size="15" />
        </RouterLink>
      </div>

      <!-- Category Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <RouterLink
          v-for="(cat, index) in categories"
          :key="cat.id"
          :to="`/shop/${cat.slug}`"
          class="group relative overflow-hidden rounded-2xl block reveal-scale"
          :class="`delay-${index * 100}`"
          style="aspect-ratio: 3/4;"
        >
          <!-- Image -->
          <img
            :src="cat.image"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
            loading="lazy"
          />

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

          <!-- Content -->
          <div class="absolute inset-x-0 bottom-0 p-5">
            <p class="text-white/50 text-[10px] tracking-[0.25em] uppercase font-medium mb-1.5">{{ cat.subCategories.slice(0,2).join(' · ') }}</p>
            <h3 class="text-white font-black text-lg md:text-xl leading-tight mb-3">{{ cat.name }}</h3>
            <div class="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-widest">
              <span class="bg-brand-red text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest">Shop Now</span>
              <ArrowRight :size="14" class="text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- Mobile View All -->
      <div class="mt-6 text-center md:hidden">
        <RouterLink to="/shop" class="btn-secondary">View All Categories</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { categories } from '../../data/categories.js'
</script>
