<template>
  <div>
    <!-- Category + Badges -->
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="text-brand-muted text-xs tracking-widest uppercase font-semibold">{{ product.category }}</span>
      <span class="text-brand-border-2">·</span>
      <span class="text-brand-muted text-xs">{{ product.subCategory }}</span>
      <span v-if="product.bestseller" class="ml-auto px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-brand-dark text-white rounded-full">
        ★ Best Seller
      </span>
      <span v-else-if="product.badge === 'new'" class="ml-auto px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-brand-red text-white rounded-full">
        New Arrival
      </span>
    </div>

    <!-- Name -->
    <h1 class="text-brand-text font-black text-2xl md:text-3xl xl:text-4xl mb-4 leading-tight">
      {{ product.name }}
    </h1>

    <!-- Rating row -->
    <div class="flex items-center gap-3 mb-5">
      <div class="flex gap-0.5">
        <Star v-for="i in 5" :key="i" :size="14"
          :class="i <= Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-border-2'"
        />
      </div>
      <span class="text-brand-body text-sm font-semibold">{{ product.rating }}</span>
      <span class="text-brand-muted text-sm">({{ product.reviewCount }} reviews)</span>
      <span class="w-px h-4 bg-brand-border"></span>
      <span class="text-green-600 text-sm font-medium">In Stock</span>
    </div>

    <!-- Price -->
    <div class="flex items-end gap-3 mb-5 pb-5 border-b border-brand-border">
      <span class="text-brand-text font-black text-3xl leading-none">
        Rs. {{ (product.salePrice || product.price).toLocaleString() }}
      </span>
      <span v-if="product.salePrice" class="text-brand-muted text-lg font-medium line-through leading-none">
        Rs. {{ product.price.toLocaleString() }}
      </span>
      <span v-if="product.discount" class="px-2.5 py-1 bg-brand-red text-white text-xs font-bold tracking-wide rounded-full">
        -{{ product.discount }}%
      </span>
    </div>

    <!-- Save message -->
    <div v-if="product.salePrice" class="flex items-center gap-2 mb-5">
      <div class="w-2 h-2 rounded-full bg-green-500"></div>
      <p class="text-green-600 text-sm font-semibold">
        You save Rs. {{ (product.price - product.salePrice).toLocaleString() }} on this order
      </p>
    </div>

    <p class="text-brand-body text-sm leading-relaxed mb-7">{{ product.description }}</p>

    <!-- Size Selector -->
    <div v-if="product.sizes?.length" class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <label class="text-brand-text text-sm font-bold tracking-wide">Size</label>
        <button class="text-brand-red text-xs font-medium hover:underline transition-colors">Size Guide</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in product.sizes"
          :key="size"
          @click="selectedSize = size"
          class="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-250"
          :class="selectedSize === size
            ? 'border-brand-red bg-brand-red/5 text-brand-text'
            : 'border-brand-border text-brand-muted hover:border-brand-border-2 hover:text-brand-text'"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Color Selector -->
    <div v-if="product.colors?.length > 1" class="mb-7">
      <label class="text-brand-text text-sm font-bold tracking-wide mb-3 block">
        Color: <span class="font-normal text-brand-muted ml-1">{{ selectedColor }}</span>
      </label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in product.colors"
          :key="color"
          @click="selectedColor = color"
          class="px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition-all duration-250"
          :class="selectedColor === color
            ? 'border-brand-red bg-brand-red/5 text-brand-text'
            : 'border-brand-border text-brand-muted hover:border-brand-border-2 hover:text-brand-text'"
        >
          {{ color }}
        </button>
      </div>
    </div>

    <!-- Quantity + Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 mb-7">
      <div class="flex items-center rounded-lg border border-brand-border overflow-hidden">
        <button @click="qty = Math.max(1, qty - 1)" class="w-11 h-12 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors">
          <Minus :size="16" />
        </button>
        <span class="w-12 h-12 flex items-center justify-center text-brand-text font-bold text-sm border-x border-brand-border">{{ qty }}</span>
        <button @click="qty++" class="w-11 h-12 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors">
          <Plus :size="16" />
        </button>
      </div>
      <button
        @click="addToCart"
        class="btn-primary flex-1 py-3 text-sm"
        :class="!selectedSize && product.sizes?.length ? 'opacity-70' : ''"
      >
        <ShoppingCart :size="17" />
        {{ !selectedSize && product.sizes?.length ? 'Select a Size' : 'Add to Cart' }}
      </button>
      <button
        @click="toggleWishlist"
        class="w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-300 flex-shrink-0"
        :class="isWishlisted ? 'border-brand-red bg-brand-red/5' : 'border-brand-border hover:border-brand-border-2'"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
      >
        <Heart :size="17" :class="isWishlisted ? 'text-brand-red fill-brand-red' : 'text-brand-muted'" />
      </button>
    </div>

    <!-- Meta info box -->
    <div class="rounded-xl bg-brand-surface border border-brand-border px-5 py-4 mb-6 space-y-2.5 text-sm">
      <div class="flex items-center gap-3">
        <Truck :size="15" class="text-brand-red flex-shrink-0" />
        <span class="text-brand-body">Free delivery on orders above <span class="text-brand-text font-semibold">Rs. 999</span></span>
      </div>
      <div class="flex items-center gap-3">
        <ShieldCheck :size="15" class="text-brand-red flex-shrink-0" />
        <span class="text-brand-body">Authentic &amp; quality-guaranteed product</span>
      </div>
      <div class="flex items-center gap-3">
        <RotateCcw :size="15" class="text-brand-red flex-shrink-0" />
        <span class="text-brand-body">7-day hassle-free returns &amp; exchanges</span>
      </div>
    </div>

    <!-- SKU -->
    <p class="text-brand-muted text-xs">SKU: <span class="font-mono">{{ product.sku }}</span></p>

    <!-- Accordions -->
    <div class="mt-6 border-t border-brand-border">
      <div
        v-for="section in accordions"
        :key="section.title"
        class="border-b border-brand-border"
      >
        <button
          @click="openAccordion === section.title ? openAccordion = '' : openAccordion = section.title"
          class="flex w-full items-center justify-between py-4 text-brand-text font-semibold text-sm hover:text-brand-red transition-colors"
        >
          {{ section.title }}
          <ChevronDown :size="16" class="text-brand-muted transition-transform duration-300" :class="openAccordion === section.title ? 'rotate-180' : ''" />
        </button>
        <div v-if="openAccordion === section.title" class="pb-5 text-brand-body text-sm leading-relaxed">
          {{ section.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Star, ShoppingCart, Heart, Minus, Plus,
  Truck, ShieldCheck, RotateCcw, ChevronDown
} from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore.js'
import { useWishlistStore } from '../../stores/wishlistStore.js'
import { useUiStore } from '../../stores/uiStore.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore    = useCartStore()
const wishlistStore = useWishlistStore()
const uiStore      = useUiStore()

const selectedSize  = ref(props.product.sizes?.[0] || '')
const selectedColor = ref(props.product.colors?.[0] || '')
const qty           = ref(1)
const openAccordion = ref('')

const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))

const accordions = [
  {
    title: 'Product Details',
    content: props.product.description || 'High-performance athletic wear engineered for intense training sessions.'
  },
  {
    title: 'Size & Fit',
    content: 'Refer to our size guide. Our athletic cut is designed for a slightly fitted look. If between sizes, we recommend sizing up for layering or sizing down for a compression-like fit.'
  },
  {
    title: 'Care Instructions',
    content: 'Machine washable at 30°C. Do not bleach. Do not tumble dry. Iron at low temperature. Do not dry clean. Wash inside out to preserve color and print quality.'
  },
  {
    title: 'Shipping & Returns',
    content: 'Standard delivery 2–5 business days. Free delivery on orders above Rs. 999. Returns accepted within 7 days in unwashed, original condition with tags attached.'
  },
]

function addToCart() {
  if (!selectedSize.value && props.product.sizes?.length) {
    uiStore.showNotification('Please select a size', 'error')
    return
  }
  cartStore.addItem(props.product, { size: selectedSize.value, color: selectedColor.value, quantity: qty.value })
  uiStore.showNotification(`${props.product.name} added to cart`, 'success')
}

function toggleWishlist() {
  wishlistStore.toggleWishlist(props.product)
  uiStore.showNotification(
    isWishlisted.value ? 'Removed from wishlist' : 'Added to wishlist',
    'success'
  )
}
</script>
