<template>
  <section class="bg-white border-b border-brand-border py-8 md:py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-center md:justify-between gap-6 md:gap-4">
        <div
          v-for="(badge, index) in badges"
          :key="badge.label"
          class="flex items-center gap-3 reveal"
          :class="`delay-${index * 100}`"
        >
          <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-brand-surface border border-brand-border">
            <component :is="badge.icon" :size="18" class="text-brand-red" />
          </div>
          <div>
            <p class="text-brand-text font-bold text-sm leading-tight">{{ badge.label }}</p>
            <p class="text-brand-muted text-xs mt-0.5">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Shield, Zap, Lock, Truck, RefreshCw } from 'lucide-vue-next'

const badges = [
  { icon: Shield,    label: 'Premium Quality',      desc: 'Uncompromised craftsmanship' },
  { icon: Zap,       label: 'Performance Fabric',   desc: 'Athletes-grade materials' },
  { icon: Lock,      label: 'Secure Payments',      desc: 'Safe & encrypted checkout' },
  { icon: Truck,     label: 'Fast Delivery',        desc: 'Dispatch within 24 hours' },
  { icon: RefreshCw, label: 'Easy Returns',         desc: '15-day hassle-free returns' },
]
</script>
