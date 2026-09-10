<template>
  <div>
    <div
      class="grid gap-3 sm:gap-4 md:gap-5"
      :class="gridClasses"
    >
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="reveal h-full"
        :class="`delay-${Math.min(index % 4, 6) * 100}`"
      >
        <ProductCard :product="product" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="products.length === 0" class="py-20 text-center">
      <PackageOpen :size="48" class="mx-auto text-brand-border-2 mb-4" />
      <p class="text-brand-muted text-lg font-medium">No products found</p>
      <p class="text-brand-subtle text-sm mt-1">Try adjusting your filters or search query</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PackageOpen } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: { type: Array, default: () => [] },
  columns:  { type: String, default: 'default' },
})

const gridClasses = computed(() => {
  switch (props.columns) {
    case '3':
      return 'grid-cols-2 md:grid-cols-3'
    case '2':
      return 'grid-cols-2'
    case '4':
      return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    default:
      return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }
})
</script>
