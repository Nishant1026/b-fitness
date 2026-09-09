<template>
  <!-- ==================== ULTRA-LUXURY HERO SECTION ==================== -->
  <section class="relative w-full -mt-[1px] 
                  min-h-[480px] 
                  sm:min-h-[580px] 
                  lg:min-h-[700px] 
                  flex items-center 
                  overflow-hidden 
                  bg-neutral-950">
    
    <!-- Cinematic Slide Backgrounds with Smooth Zoom -->
    <div class="absolute inset-0 w-full h-full">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
      >
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover object-center transform transition-transform duration-[10000ms] ease-out select-none pointer-events-none"
          :class="currentIndex === index ? 'scale-105' : 'scale-100'"
          loading="lazy"
        />
        <!-- Multi-layered Editorial Vignette Overlays for High-End Depth -->
        <div class="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30"></div>
      </div>
    </div>

    <!-- Main Content Container perfectly vertically centered -->
    <div class="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 lg:py-20">
      <Transition name="hero-content" mode="out-in">
        <div :key="currentIndex" class="max-w-3xl text-left">
          
          <!-- Editorial Luxury Pill Badge -->
          <div class="inline-flex items-center gap-2.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-3 sm:mb-5 opacity-0 animate-fade-in shadow-2xl" style="animation-fill-mode: forwards; animation-delay: 0.15s;">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span class="text-white text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase">{{ slides[currentIndex].label }}</span>
          </div>

          <!-- Masterclass Dynamic Typography Headings -->
          <h1 class="font-black text-white tracking-tight uppercase leading-[0.92] mb-3 sm:mb-5 drop-shadow-2xl" style="font-size: clamp(36px, 7.5vw, 88px);">
            <span class="block opacity-0 animate-fade-up" style="animation-fill-mode: forwards; animation-delay: 0.3s;">
              {{ slides[currentIndex].headline1 }}
            </span>
            <span class="block text-red-500 opacity-0 animate-fade-up mt-1 sm:mt-1.5" style="animation-fill-mode: forwards; animation-delay: 0.45s;">
              {{ slides[currentIndex].headline2 }}
            </span>
          </h1>

          <!-- Refined Luxury Subtext -->
          <p class="text-neutral-200/90 text-xs sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-5 sm:mb-8 opacity-0 animate-fade-up drop-shadow" style="animation-fill-mode: forwards; animation-delay: 0.6s;">
            {{ slides[currentIndex].subtext }}
          </p>

          <!-- High-End Glass & Solid Action Buttons -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 opacity-0 animate-fade-up" style="animation-fill-mode: forwards; animation-delay: 0.75s;">
            <RouterLink
              :to="slides[currentIndex].cta1Link"
              class="px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-neutral-900 hover:bg-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest text-center transition-all duration-300 shadow-2xl shadow-black/30 hover:scale-[1.02]"
            >
              {{ slides[currentIndex].cta1 }}
            </RouterLink>
            <RouterLink
              :to="slides[currentIndex].cta2Link"
              class="px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-2xl text-xs font-black uppercase tracking-widest text-center transition-all duration-300 hover:scale-[1.02] shadow-xl"
            >
              {{ slides[currentIndex].cta2 }}
            </RouterLink>
          </div>

        </div>
      </Transition>
    </div>

    <!-- Minimalist Absolute Controls (Bottom Right) -->
    <div class="absolute bottom-4 right-4 sm:bottom-6 sm:right-12 z-20 flex items-center gap-4 sm:gap-5">
      <!-- Slide Counter indicator -->
      <div class="text-white/70 text-xs font-bold tracking-widest font-mono">
        <span class="text-white">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
        <span class="mx-1.5 opacity-40">/</span>
        <span>{{ String(slides.length).padStart(2, '0') }}</span>
      </div>

      <!-- Arrow Buttons -->
      <div class="flex items-center gap-2">
        <button
          @click="prev"
          class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white text-white hover:text-neutral-900 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft :size="16" />
        </button>
        <button
          @click="next"
          class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white text-white hover:text-neutral-900 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <!-- Minimalist Bottom Progress Bar -->
    <div class="absolute bottom-0 left-0 right-0 z-25 h-1 bg-white/10">
      <div
        class="h-full bg-red-600 transition-all duration-500 ease-out"
        :style="{ width: `${((currentIndex + 1) / slides.length) * 100}%` }"
      ></div>
    </div>
  </section>

  <!-- Fullscreen Search Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="uiStore.searchOpen" class="fixed inset-0 z-[70] bg-white/95 backdrop-blur-2xl flex flex-col items-center pt-32 px-6">
        <button @click="uiStore.closeSearch()" class="absolute top-8 right-8 p-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close search">
          <X :size="24" />
        </button>
        <div class="w-full max-w-2xl">
          <p class="text-neutral-400 text-xs tracking-[0.25em] uppercase font-bold mb-4 text-center">Search Store Inventory</p>
          <div class="relative">
            <Search class="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" :size="20" />
            <input
              v-model="overlaySearch"
              @keyup.enter="doOverlaySearch"
              type="text"
              placeholder="Search by apparel name, collection, or SKU..."
              class="w-full pl-14 pr-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-base font-semibold focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-xl"
              autofocus
            />
          </div>
          <div v-if="overlayResults.length > 0" class="mt-6 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            <RouterLink
              v-for="p in overlayResults.slice(0, 6)"
              :key="p.id"
              :to="`/product/${p.slug}`"
              @click="uiStore.closeSearch()"
              class="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 transition-all group"
            >
              <img :src="p.thumbnail" :alt="p.name" class="w-12 h-12 object-cover rounded-xl shadow-sm" loading="lazy" />
              <div>
                <div class="text-neutral-900 font-bold text-sm group-hover:text-red-600 transition-colors">{{ p.name }}</div>
                <div class="text-neutral-400 text-xs uppercase tracking-wider">{{ p.subCategory }}</div>
              </div>
              <div class="ml-auto text-neutral-900 font-black text-sm">Rs. {{ (p.salePrice || p.price).toLocaleString() }}</div>
            </RouterLink>
          </div>
          <p v-else-if="overlaySearch.length > 1" class="text-neutral-400 text-center mt-12 text-sm font-medium">No products found matching "{{ overlaySearch }}"</p>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Mobile Responsive Navigation Drawer -->
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[80] flex">
        <!-- Backdrop -->
        <div @click="isMobileMenuOpen = false" class="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm"></div>

        <!-- Drawer Content Panel -->
        <div class="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto border-r border-neutral-200">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 text-white font-black">B</div>
              <span class="text-neutral-900 font-black tracking-widest uppercase text-sm">B-FIT Menu</span>
            </div>
            <button @click="isMobileMenuOpen = false" class="p-2 text-neutral-500 hover:bg-neutral-100 rounded-xl" aria-label="Close menu">
              <X :size="20" />
            </button>
          </div>

          <!-- Mobile Links -->
          <div class="flex flex-col gap-1 py-6 text-xs font-bold uppercase tracking-wider text-neutral-800">
            <RouterLink to="/" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors">Home</RouterLink>
            <RouterLink to="/shop/sports-clothing" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors">Men's Apparel</RouterLink>
            <RouterLink to="/shop/sports-clothing" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors">Women's Apparel</RouterLink>
            <RouterLink to="/shop/gym-accessories" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors">Accessories</RouterLink>
            <RouterLink to="/shop/sports-supplements" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl hover:bg-neutral-100 transition-colors">Supplements</RouterLink>
            <RouterLink to="/offers" @click="isMobileMenuOpen = false" class="py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors">Sale Offers</RouterLink>
          </div>

          <!-- Mobile Footer CTA -->
          <div class="mt-auto pt-6 border-t border-neutral-100 flex flex-col gap-3">
            <RouterLink to="/login" @click="isMobileMenuOpen = false" class="w-full py-3.5 bg-neutral-900 text-white text-center rounded-xl font-bold text-xs uppercase tracking-widest shadow-md">
              Sign In / Account
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useUiStore } from '../../stores/uiStore.js'
import { useProductStore } from '../../stores/productStore.js'

const uiStore = useUiStore()
const productStore = useProductStore()

const isMobileMenuOpen = ref(false)

const overlaySearch = ref('')
const overlayResults = computed(() => {
  if (!overlaySearch.value.trim() || overlaySearch.value.length < 2) return []
  const q = overlaySearch.value.toLowerCase()
  return productStore.allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subCategory.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  )
})

function doOverlaySearch() {
  if (overlaySearch.value.trim()) {
    productStore.searchQuery = overlaySearch.value
    uiStore.closeSearch()
    overlaySearch.value = ''
  }
}

// Hero Carousel State
const slides = [
  {
    id: 1,
    label: 'New Season Drop',
    headline1: 'TRAIN HARD.',
    headline2: 'BE UNSTOPPABLE.',
    subtext: 'Premium performance wear engineered for high-intensity training, built with moisture-wicking stretch fabrics.',
    cta1: 'Shop Men Collection',
    cta1Link: '/shop/sports-clothing',
    cta2: 'Shop Women',
    cta2Link: '/shop/sports-clothing',
    image: 'https://images.unsplash.com/photo-1534438327-3d159c1dcdd3?w=1800&q=90',
    alt: 'Athlete training in B-FIT athletic wear',
  },
  {
    id: 2,
    label: 'Performance Bottoms',
    headline1: 'MOVE WITHOUT',
    headline2: 'LIMITS.',
    subtext: 'Track pants and shorts designed for absolute freedom of movement, combining urban style with gym utility.',
    cta1: 'Explore Bottomwear',
    cta1Link: '/shop/performance-bottomwear',
    cta2: 'View Active Sale',
    cta2Link: '/offers',
    image: 'https://images.unsplash.com/photo-1571019613445-01f75c7c1b87?w=1800&q=90',
    alt: 'Performance bottomwear for intensive training',
  },
  {
    id: 3,
    label: 'Pro Accessories',
    headline1: 'EQUIP YOUR',
    headline2: 'AMBITION.',
    subtext: 'Professional-grade gym accessories designed to support structural stability and power output during heavy lifts.',
    cta1: 'Shop Accessories',
    cta1Link: '/shop/gym-accessories',
    cta2: 'View Supplements',
    cta2Link: '/shop/sports-supplements',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1800&q=90',
    alt: 'Premium gym accessories and equipment',
  },
]

const currentIndex = ref(0)
let timer = null

function startTimer() {
  timer = setInterval(next, 6000)
}
function clearTimer() {
  if (timer) clearInterval(timer)
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

let touchStartX = 0
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
}
function handleTouchEnd(e) {
  const delta = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) > 50) {
    delta > 0 ? prev() : next()
    clearTimer()
    startTimer()
  }
}

onMounted(() => {
  startTimer()
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  clearTimer()
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-up {
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-content-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-content-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-content-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.hero-content-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>