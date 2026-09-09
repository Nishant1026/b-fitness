<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16"></div>

    <div v-if="product">
      <!-- Page Header -->
      <div class="bg-brand-surface border-b border-brand-border py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb :items="[
            { label: 'Shop', to: '/shop' },
            { label: product.category, to: `/shop/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
            { label: product.name }
          ]" />
        </div>
      </div>

      <!-- Main Product Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid lg:grid-cols-2 gap-8 xl:gap-14">
          <!-- Gallery -->
          <ProductGallery :images="product.images" :name="product.name" />
          <!-- Info -->
          <div class="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo :product="product" />
          </div>
        </div>
      </div>

      <!-- Full-width feature strip -->
      <div class="bg-brand-surface border-y border-brand-border py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="feat in features" :key="feat.label" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-brand-red/8 border border-brand-red/15 flex items-center justify-center flex-shrink-0">
                <component :is="feat.icon" :size="16" class="text-brand-red" />
              </div>
              <div>
                <p class="text-brand-text text-xs font-bold leading-snug">{{ feat.label }}</p>
                <p class="text-brand-muted text-[11px] leading-snug">{{ feat.sub }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-bold mb-2">Related Items</p>
            <h2 class="text-brand-white font-black text-2xl md:text-3xl">You May Also Like</h2>
          </div>
          <RouterLink :to="`/shop/${product.category.toLowerCase().replace(/\s+/g, '-')}`" class="btn-ghost border border-white/15 text-xs">View All</RouterLink>
        </div>
        <ProductGrid :products="relatedProducts" columns="4" />
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center">
      <h1 class="text-brand-white font-black text-3xl mb-4">Product Not Found</h1>
      <p class="text-brand-silver mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <RouterLink to="/shop" class="btn-primary">Browse Shop</RouterLink>
    </div>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="uiStore.notification" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-brand-dark-2 border border-white/[0.10] text-brand-white text-sm font-medium shadow-card flex items-center gap-2.5 whitespace-nowrap">
          <CheckCircle :size="15" class="text-green-400 flex-shrink-0" />
          {{ uiStore.notification.message }}
        </div>
      </Transition>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle, Truck, ShieldCheck, RotateCcw, Award } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import ProductGallery from '../components/product/ProductGallery.vue'
import ProductInfo from '../components/product/ProductInfo.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import { useProductStore } from '../stores/productStore.js'
import { useUiStore } from '../stores/uiStore.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const route        = useRoute()
const productStore = useProductStore()
const uiStore      = useUiStore()
const { refresh }  = useScrollReveal()

const product         = computed(() => productStore.getProductBySlug(route.params.slug))
const relatedProducts = computed(() => product.value ? productStore.getRelatedProducts(product.value, 4) : [])

const features = [
  { icon: Truck,       label: 'Free Shipping',       sub: 'On orders above Rs. 999' },
  { icon: ShieldCheck, label: '100% Authentic',      sub: 'Quality guaranteed' },
  { icon: RotateCcw,   label: '7-Day Returns',       sub: 'Hassle-free exchange' },
  { icon: Award,       label: 'Premium Quality',     sub: 'Built to last' },
]

onMounted(() => setTimeout(refresh, 200))
watch(() => route.params.slug, () => window.scrollTo({ top: 0 }))
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(14px); }
</style>
