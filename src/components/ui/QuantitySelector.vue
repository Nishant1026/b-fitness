<template>
  <div class="flex items-center gap-0 border border-white/10 rounded overflow-hidden flex-shrink-0">
    <button
      @click="decrement"
      class="w-9 h-9 flex items-center justify-center text-brand-silver hover:text-brand-white hover:bg-white/10 transition-all duration-300"
      :disabled="modelValue <= min"
      aria-label="Decrease"
    >
      <Minus :size="14" />
    </button>
    <span class="w-12 text-center text-brand-white font-semibold text-base select-none">{{ modelValue }}</span>
    <button
      @click="increment"
      class="w-9 h-9 flex items-center justify-center text-brand-silver hover:text-brand-white hover:bg-white/10 transition-all duration-300"
      :disabled="modelValue >= max"
      aria-label="Increase"
    >
      <Plus :size="14" />
    </button>
  </div>
</template>

<script setup>
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 }
})

const emit = defineEmits(['update:modelValue'])

function increment() {
  if (props.modelValue < props.max) emit('update:modelValue', props.modelValue + 1)
}
function decrement() {
  if (props.modelValue > props.min) emit('update:modelValue', props.modelValue - 1)
}
</script>
