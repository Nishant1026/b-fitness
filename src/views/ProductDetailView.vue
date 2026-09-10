<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div v-if="product">
      <!-- Page Header & Breadcrumb -->
      <div class="bg-brand-surface border-b border-brand-border py-4 md:py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb :items="breadcrumbs" />
        </div>
      </div>

      <!-- Main Product Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid lg:grid-cols-2 gap-8 xl:gap-14 items-start">
          <!-- Left: Gallery -->
          <div class="lg:sticky lg:top-24">
            <ProductGallery :images="product.images || [product.thumbnail]" :name="product.name" />
          </div>
          <!-- Right: Info -->
          <div>
            <ProductInfo :product="product" />
          </div>
        </div>
      </div>

      <!-- Full-width feature strip -->
      <div class="bg-brand-surface border-y border-brand-border py-6 my-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="feat in features" :key="feat.label" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                <component :is="feat.icon" :size="18" class="text-brand-red" />
              </div>
              <div>
                <p class="text-brand-text text-xs md:text-sm font-bold leading-snug">{{ feat.label }}</p>
                <p class="text-brand-muted text-[11px] leading-snug">{{ feat.sub }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-bold mb-1.5">Handpicked Pairings</p>
            <h2 class="text-brand-text font-black text-2xl md:text-3xl">Related Products</h2>
          </div>
          <RouterLink :to="`/shop/${product.category}`" class="text-brand-muted hover:text-brand-red font-bold text-xs flex items-center gap-1">
            View All in {{ product.category }} →
          </RouterLink>
        </div>
        <!-- Reusable ProductGrid (Strictly 2 columns on mobile) -->
        <ProductGrid :products="relatedProducts" columns="4" />
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 text-center">
      <h1 class="text-brand-text font-black text-3xl mb-4">Product Not Found</h1>
      <p class="text-brand-muted mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <RouterLink to="/shop" class="btn-primary">Browse Shop</RouterLink>
    </div>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="uiStore.notification" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-brand-dark text-white text-sm font-medium shadow-card flex items-center gap-2.5 whitespace-nowrap">
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

const route = useRoute()
const productStore = useProductStore()
const uiStore = useUiStore()
const { refresh } = useScrollReveal()

const product = computed(() => productStore.getProductBySlug(route.params.slug))
const relatedProducts = computed(() => product.value ? productStore.getRelatedProducts(product.value, 4) : [])

const breadcrumbs = computed(() => {
  if (!product.value) return [{ label: 'Shop', to: '/shop' }]
  const cat = product.value.category
  const sub = product.value.subcategory
  const catLabel = cat === 'men' ? "Men's Collection" : cat === 'women' ? "Women's Collection" : cat.charAt(0).toUpperCase() + cat.slice(1)
  const subLabel = product.value.categoryName || (sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : '')

  const list = [
    { label: 'Shop', to: '/shop' },
    { label: catLabel, to: `/shop/${cat}` }
  ]
  if (sub && subLabel) {
    list.push({ label: subLabel, to: `/shop/${cat}/${sub}` })
  }
  list.push({ label: product.value.name })
  return list
})

const features = [
  { icon: Truck,       label: 'Free Express Shipping', sub: 'On orders above Rs. 999' },
  { icon: ShieldCheck, label: '100% Authentic',        sub: 'Laboratory tested & verified' },
  { icon: RotateCcw,   label: '7-Day Easy Returns',    sub: 'Hassle-free exchange policy' },
  { icon: Award,       label: 'Athlete Certified',     sub: 'Engineered for max durability' },
]

onMounted(() => setTimeout(refresh, 200))
watch(() => route.params.slug, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(refresh, 300)
})
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(14px); }
</style>
