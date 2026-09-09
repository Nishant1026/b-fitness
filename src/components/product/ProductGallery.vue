<template>
  <div class="flex gap-4">
    <!-- Thumbnails column -->
    <div class="hidden md:flex flex-col gap-3 w-[76px] flex-shrink-0">
      <button
        v-for="(img, i) in images"
        :key="i"
        @click="active = i"
        class="relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0"
        :class="active === i ? 'border-brand-red shadow-sm-dark' : 'border-white/[0.08] hover:border-white/20'"
      >
        <img :src="img" :alt="`${name} view ${i + 1}`" class="w-full h-full object-cover" loading="lazy" />
        <div v-if="active !== i" class="absolute inset-0 bg-brand-black/30"></div>
      </button>
    </div>

    <!-- Main image -->
    <div class="flex-1">
      <div
        class="relative overflow-hidden rounded-xl bg-brand-charcoal cursor-zoom-in"
        style="aspect-ratio: 1 / 1;"
        @click="lightboxOpen = true"
      >
        <img
          :src="images[active]"
          :alt="name"
          class="w-full h-full object-cover transition-all duration-700"
          loading="lazy"
        />
        <!-- Discount badge -->
        <slot name="badge" />

        <!-- Zoom icon -->
        <div class="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-brand-black/50 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-brand-black/80 transition-colors">
          <ZoomIn :size="16" class="text-brand-silver-2" />
        </div>
      </div>

      <!-- Mobile thumbnails below -->
      <div class="flex md:hidden gap-2.5 mt-3 overflow-x-auto pb-1">
        <button
          v-for="(img, i) in images"
          :key="i"
          @click="active = i"
          class="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300"
          :class="active === i ? 'border-brand-red' : 'border-white/[0.08]'"
        >
          <img :src="img" :alt="`View ${i + 1}`" class="w-full h-full object-cover" loading="lazy" />
        </button>
      </div>
    </div>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-[90] bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
        @click.self="lightboxOpen = false"
      >
        <button @click="lightboxOpen = false" class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray border border-white/10 text-brand-silver-2 hover:text-white transition-colors" aria-label="Close">
          <X :size="18" />
        </button>
        <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray border border-white/10 text-white hover:border-white/25 transition-colors" aria-label="Previous">
          <ChevronLeft :size="20" />
        </button>
        <img :src="images[active]" :alt="name" class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-card" />
        <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray border border-white/10 text-white hover:border-white/25 transition-colors" aria-label="Next">
          <ChevronRight :size="20" />
        </button>
        <!-- Thumbnail row in lightbox -->
        <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          <button v-for="(img, i) in images" :key="i" @click="active = i"
            class="w-12 h-12 rounded overflow-hidden border-2 transition-all duration-300 flex-shrink-0"
            :class="active === i ? 'border-brand-red' : 'border-white/15 opacity-60 hover:opacity-100'"
          >
            <img :src="img" :alt="`Thumb ${i + 1}`" class="w-full h-full object-cover" loading="lazy" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  images: { type: Array, required: true },
  name:   { type: String, default: '' }
})

const active = ref(0)
const lightboxOpen = ref(false)

function prev() { active.value = (active.value - 1 + props.images.length) % props.images.length }
function next() { active.value = (active.value + 1) % props.images.length }
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
