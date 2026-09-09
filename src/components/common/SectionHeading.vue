<template>
  <div>
    <!-- Heading -->
    <div class="flex items-end justify-between mb-8">
      <div :class="centered ? 'text-center w-full' : ''">
        <p v-if="eyebrow" class="text-brand-red text-xs tracking-[0.3em] uppercase font-bold mb-3">{{ eyebrow }}</p>
        <h2 class="text-brand-white font-black text-3xl md:text-4xl leading-tight">{{ title }}</h2>
        <p v-if="subtitle" class="text-brand-silver/60 text-base mt-3 max-w-xl" :class="centered ? 'mx-auto' : ''">
          {{ subtitle }}
        </p>
      </div>
      <RouterLink v-if="linkTo && !centered" :to="linkTo" class="hidden md:flex items-center gap-2 text-brand-silver hover:text-brand-white text-sm font-semibold tracking-wide transition-colors group flex-shrink-0">
        {{ linkLabel || 'View All' }}
        <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform duration-300" />
      </RouterLink>
    </div>
    <!-- Mobile Link -->
    <div v-if="linkTo && centered" class="text-center mt-2 mb-8">
      <RouterLink :to="linkTo" class="btn-secondary inline-flex text-sm py-3">{{ linkLabel || 'View All' }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  subtitle: String,
  linkTo: String,
  linkLabel: String,
  centered: { type: Boolean, default: false }
})
</script>
