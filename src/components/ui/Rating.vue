<template>
  <div class="flex items-center gap-1">
    <Star
      v-for="i in 5"
      :key="i"
      :size="size"
      :class="i <= roundedRating ? 'text-brand-gold fill-brand-gold' : 'text-brand-silver/20'"
    />
    <span v-if="showCount" class="text-brand-silver/50 text-xs ml-1">({{ count }})</span>
    <span v-if="showValue" class="text-brand-silver/70 text-xs ml-1 font-medium">{{ rating }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'

const props = defineProps({
  rating: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  size: { type: Number, default: 14 },
  showCount: { type: Boolean, default: false },
  showValue: { type: Boolean, default: false },
})

const roundedRating = computed(() => Math.round(props.rating))
</script>
