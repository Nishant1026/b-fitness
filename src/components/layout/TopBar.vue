<template>
  <!-- Announcement bar with CSS marquee — visible on all screen sizes -->
  <div class="bg-brand-dark text-white text-xs font-medium overflow-hidden" style="height:38px; display:flex; align-items:center;">
    <div class="marquee-wrapper w-full" style="overflow:hidden; display:flex;">
      <div class="marquee-track flex items-center gap-0">
        <span v-for="i in 6" :key="i" class="flex items-center gap-8 px-8 flex-shrink-0">
          <span class="flex items-center gap-2">
            <Zap :size="12" class="text-brand-gold flex-shrink-0" />
            <span>10% OFF on First Order — Use code <strong class="text-white">BFIT10</strong></span>
          </span>
          <span class="opacity-30">|</span>
          <span class="flex items-center gap-2">
            <Truck :size="12" class="text-brand-red flex-shrink-0" />
            <span>Free Shipping on orders above <strong>Rs. 999</strong></span>
          </span>
          <span class="opacity-30">|</span>
          <span class="flex items-center gap-2">
            <RefreshCw :size="12" class="opacity-60 flex-shrink-0" />
            <span>15-Day Hassle-Free Returns</span>
          </span>
          <span class="opacity-30">|</span>
          <span class="flex items-center gap-2">
            <Shield :size="12" class="opacity-60 flex-shrink-0" />
            <span>100% Authentic & Quality Guaranteed</span>
          </span>
          <span class="opacity-30">|</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Zap, Truck, RefreshCw, Shield } from 'lucide-vue-next'
</script>
