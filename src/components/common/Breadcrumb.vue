<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-xs tracking-wide text-brand-muted">
    <RouterLink to="/" class="hover:text-brand-red transition-colors duration-300">Home</RouterLink>
    <template v-for="(item, idx) in items" :key="idx">
      <ChevronRight :size="12" class="text-brand-border-2 flex-shrink-0" />
      <RouterLink v-if="item.to && idx < items.length - 1" :to="item.to" class="hover:text-brand-red transition-colors duration-300">
        {{ item.label }}
      </RouterLink>
      <span v-else class="text-brand-body font-medium line-clamp-1">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'

defineProps({
  items: { type: Array, required: true }  // [{label, to?}]
})
</script>
