<template>
  <div>
    <!-- Category + Badges -->
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <RouterLink :to="`/shop/${product.category}`" class="text-brand-muted text-xs tracking-widest uppercase font-semibold hover:text-brand-red transition-colors">
        {{ product.category }}
      </RouterLink>
      <span class="text-brand-border-2">·</span>
      <RouterLink :to="`/shop/${product.category}/${product.subcategory}`" class="text-brand-muted text-xs hover:text-brand-red transition-colors">
        {{ product.categoryName || product.subcategory }}
      </RouterLink>
      <span v-if="product.bestseller || product.badge === 'bestseller'" class="ml-auto px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-brand-dark text-white rounded-full">
        ★ Best Seller
      </span>
      <span v-else-if="product.badge === 'new'" class="ml-auto px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-brand-red text-white rounded-full">
        New Arrival
      </span>
      <span v-else-if="product.sale || product.discount > 0" class="ml-auto px-2.5 py-1 text-[10px] font-black tracking-widest uppercase bg-brand-red text-white rounded-full">
        On Sale
      </span>
    </div>

    <!-- Name -->
    <h1 class="text-brand-text font-black text-2xl md:text-3xl xl:text-4xl mb-3 leading-tight">
      {{ product.name }}
    </h1>

    <!-- Rating row -->
    <div class="flex items-center gap-3 mb-4">
      <div class="flex gap-0.5">
        <Star v-for="i in 5" :key="i" :size="14"
          :class="i <= Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-border-2'"
        />
      </div>
      <span class="text-brand-body text-sm font-semibold">{{ product.rating }}</span>
      <span class="text-brand-muted text-sm">({{ product.reviews || product.reviewCount || 0 }} reviews)</span>
      <span class="w-px h-4 bg-brand-border"></span>
      <span v-if="product.stock > 10" class="text-green-600 text-sm font-medium flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        In Stock ({{ product.stock }} available)
      </span>
      <span v-else-if="product.stock > 0" class="text-amber-600 text-sm font-medium flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        Low Stock (only {{ product.stock }} left)
      </span>
      <span v-else class="text-red-600 text-sm font-medium">Out of Stock</span>
    </div>

    <!-- Price -->
    <div class="flex items-end gap-3 mb-4 pb-4 border-b border-brand-border">
      <span class="text-brand-text font-black text-3xl leading-none">
        Rs. {{ (product.price || product.salePrice).toLocaleString() }}
      </span>
      <span v-if="hasDiscount" class="text-brand-muted text-lg font-medium line-through leading-none">
        Rs. {{ originalDisplayPrice.toLocaleString() }}
      </span>
      <span v-if="product.discount > 0" class="px-2.5 py-1 bg-brand-red text-white text-xs font-bold tracking-wide rounded-full">
        -{{ product.discount }}%
      </span>
    </div>

    <!-- Save message -->
    <div v-if="hasDiscount" class="flex items-center gap-2 mb-4 bg-green-50 text-green-700 px-3.5 py-2 rounded-xl border border-green-200/60 text-xs font-semibold">
      <span class="w-2 h-2 rounded-full bg-green-500"></span>
      <span>You save Rs. {{ savingsAmount.toLocaleString() }} with this exclusive discount</span>
    </div>

    <!-- Short Description -->
    <p class="text-brand-body text-sm leading-relaxed mb-6">{{ product.shortDescription || product.description }}</p>

    <!-- Size Selector (Hidden for accessories and supplements without sizes) -->
    <div v-if="product.sizes && product.sizes.length > 0" class="mb-6" :class="sizeError ? 'p-3 rounded-xl bg-red-50/50 border border-red-200' : ''">
      <div class="flex items-center justify-between mb-2.5">
        <div class="flex items-center gap-2">
          <label class="text-brand-text text-sm font-bold tracking-wide">Select Size</label>
          <span v-if="!selectedSize" class="text-xs text-brand-red font-medium">* Required</span>
          <span v-else class="text-xs text-brand-muted font-normal">Selected: <strong class="text-brand-text">{{ selectedSize }}</strong></span>
        </div>
        <button @click="showSizeGuide = true" class="text-brand-red text-xs font-semibold hover:underline transition-colors flex items-center gap-1">
          <Ruler :size="13" /> Size Guide
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in product.sizes"
          :key="size"
          @click="selectSize(size)"
          class="min-w-[48px] h-10 px-3.5 rounded-xl text-sm font-bold border-2 transition-all duration-200"
          :class="selectedSize === size
            ? 'border-brand-red bg-brand-red text-white shadow-sm'
            : 'border-brand-border text-brand-body hover:border-brand-text bg-white'"
        >
          {{ size }}
        </button>
      </div>
      <p v-if="sizeError" class="text-brand-red text-xs mt-2 font-semibold">Please select a size to continue</p>
    </div>

    <!-- Color Selector -->
    <div v-if="product.colors?.length > 1" class="mb-6">
      <label class="text-brand-text text-sm font-bold tracking-wide mb-2.5 block">
        Color: <span class="font-normal text-brand-muted ml-1">{{ selectedColor }}</span>
      </label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in product.colors"
          :key="color"
          @click="selectedColor = color"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200"
          :class="selectedColor === color
            ? 'border-brand-text bg-brand-surface text-brand-text'
            : 'border-brand-border text-brand-muted hover:border-brand-border-2 hover:text-brand-text bg-white'"
        >
          {{ color }}
        </button>
      </div>
    </div>

    <!-- Quantity + Action Buttons -->
    <div class="space-y-3 mb-7">
      <div class="flex items-center gap-3">
        <!-- Quantity Selector -->
        <div class="flex items-center rounded-xl border border-brand-border overflow-hidden bg-white">
          <button
            @click="qty = Math.max(1, qty - 1)"
            class="w-10 h-11 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus :size="15" />
          </button>
          <span class="w-11 h-11 flex items-center justify-center text-brand-text font-bold text-sm border-x border-brand-border">{{ qty }}</span>
          <button
            @click="qty < (product.stock || 99) ? qty++ : null"
            class="w-10 h-11 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
            aria-label="Increase quantity"
          >
            <Plus :size="15" />
          </button>
        </div>

        <!-- Add to Cart Button -->
        <button
          @click="addToCart"
          class="flex-1 h-11 flex items-center justify-center gap-2 bg-brand-text hover:bg-neutral-800 active:scale-[0.99] text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-sm"
        >
          <ShoppingCart :size="16" />
          Add to Cart
        </button>

        <!-- Wishlist Button -->
        <button
          @click="toggleWishlist"
          class="w-11 h-11 flex items-center justify-center rounded-xl border-2 transition-all duration-300 flex-shrink-0 bg-white"
          :class="isWishlisted ? 'border-brand-red bg-brand-red/5' : 'border-brand-border hover:border-brand-border-2'"
          :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        >
          <Heart :size="18" :class="isWishlisted ? 'text-brand-red fill-brand-red' : 'text-brand-muted'" />
        </button>
      </div>

      <!-- BUY NOW BUTTON -->
      <button
        @click="buyNow"
        class="w-full h-12 flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 active:scale-[0.99] text-white text-sm font-black tracking-widest uppercase rounded-xl transition-all shadow-md shadow-brand-red/20"
      >
        <Zap :size="17" />
        Buy Now
      </button>
    </div>

    <!-- Meta Highlights -->
    <div class="rounded-2xl bg-brand-surface border border-brand-border p-4 mb-6 space-y-3 text-xs sm:text-sm">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
          <Truck :size="14" class="text-brand-red" />
        </div>
        <span class="text-brand-body">Free express delivery on orders above <strong class="text-brand-text">Rs. 999</strong></span>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
          <ShieldCheck :size="14" class="text-brand-red" />
        </div>
        <span class="text-brand-body">100% Genuine, authentic B-FIT performance gear</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
          <RotateCcw :size="14" class="text-brand-red" />
        </div>
        <span class="text-brand-body">7-day hassle-free return and exchange policy</span>
      </div>
    </div>

    <!-- SKU -->
    <p class="text-brand-muted text-xs">SKU: <span class="font-mono font-bold text-brand-body">{{ product.sku }}</span></p>

    <!-- Accordions: Description, Details, Size Guide, Shipping & Returns, Reviews -->
    <div class="mt-6 border-t border-brand-border">
      <div
        v-for="section in accordions"
        :key="section.title"
        class="border-b border-brand-border"
      >
        <button
          @click="openAccordion === section.title ? openAccordion = '' : openAccordion = section.title"
          class="flex w-full items-center justify-between py-4 text-brand-text font-bold text-sm hover:text-brand-red transition-colors"
        >
          {{ section.title }}
          <ChevronDown :size="16" class="text-brand-muted transition-transform duration-300" :class="openAccordion === section.title ? 'rotate-180' : ''" />
        </button>
        <div v-if="openAccordion === section.title" class="pb-5 text-brand-body text-sm leading-relaxed">
          <!-- Rich Content -->
          <div v-if="section.title === 'Product Details & Specs'" class="space-y-3">
            <p>{{ product.description }}</p>
            <div v-if="product.features?.length" class="mt-3">
              <h5 class="font-bold text-brand-text mb-2">Key Features:</h5>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="f in product.features" :key="f">{{ f }}</li>
              </ul>
            </div>
            <div v-if="product.specifications" class="mt-3">
              <h5 class="font-bold text-brand-text mb-2">Specifications:</h5>
              <div class="grid grid-cols-2 gap-2 text-xs bg-brand-surface p-3 rounded-xl border border-brand-border">
                <div v-for="(val, key) in product.specifications" :key="key">
                  <span class="text-brand-muted">{{ key }}:</span> <strong class="text-brand-text">{{ val }}</strong>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="section.title === 'Size Guide'" class="space-y-3">
            <p>Our athletic cut is tailored for modern athletic physiques. If you prefer a loose pump-cover fit, we recommend sizing up.</p>
            <div class="overflow-x-auto">
              <table class="w-full text-xs text-left border border-brand-border rounded-lg">
                <thead class="bg-brand-surface text-brand-text font-bold">
                  <tr>
                    <th class="p-2 border-b border-brand-border">Size</th>
                    <th class="p-2 border-b border-brand-border">Chest (in)</th>
                    <th class="p-2 border-b border-brand-border">Waist (in)</th>
                    <th class="p-2 border-b border-brand-border">Length (in)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-brand-border text-brand-body">
                  <tr><td class="p-2 font-bold">S</td><td class="p-2">36–38</td><td class="p-2">30–32</td><td class="p-2">27</td></tr>
                  <tr><td class="p-2 font-bold">M</td><td class="p-2">39–41</td><td class="p-2">32–34</td><td class="p-2">28</td></tr>
                  <tr><td class="p-2 font-bold">L</td><td class="p-2">42–44</td><td class="p-2">34–36</td><td class="p-2">29</td></tr>
                  <tr><td class="p-2 font-bold">XL</td><td class="p-2">45–47</td><td class="p-2">36–38</td><td class="p-2">30</td></tr>
                  <tr><td class="p-2 font-bold">XXL</td><td class="p-2">48–50</td><td class="p-2">38–40</td><td class="p-2">31</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else-if="section.title === 'Customer Reviews'" class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-brand-surface rounded-xl border border-brand-border">
              <div class="text-2xl font-black text-brand-text">{{ product.rating }} / 5.0</div>
              <div class="text-xs text-brand-muted">Based on {{ product.reviews || product.reviewCount || 0 }} verified athlete reviews</div>
            </div>
            <p class="text-xs text-brand-muted">98% of customers recommend this item for fitness training.</p>
          </div>
          <div v-else>
            {{ section.content }}
          </div>
        </div>
      </div>
    </div>

    <!-- Size Guide Modal -->
    <Teleport to="body">
      <div v-if="showSizeGuide" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showSizeGuide = false">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
          <div class="flex items-center justify-between pb-4 border-b border-brand-border">
            <h3 class="text-brand-text font-black text-lg">Official B-FIT Size Guide</h3>
            <button @click="showSizeGuide = false" class="text-brand-muted hover:text-brand-text p-1 rounded-lg">
              <X :size="20" />
            </button>
          </div>
          <div class="py-4 text-xs sm:text-sm text-brand-body space-y-3">
            <p>Measure directly around your body using a flexible measuring tape:</p>
            <table class="w-full text-xs text-left border border-brand-border rounded-lg">
              <thead class="bg-brand-surface text-brand-text font-bold">
                <tr>
                  <th class="p-2.5 border-b border-brand-border">Size</th>
                  <th class="p-2.5 border-b border-brand-border">Chest</th>
                  <th class="p-2.5 border-b border-brand-border">Waist</th>
                  <th class="p-2.5 border-b border-brand-border">Length</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-brand-border text-brand-body">
                <tr><td class="p-2.5 font-bold">S</td><td class="p-2.5">36–38"</td><td class="p-2.5">30–32"</td><td class="p-2.5">27"</td></tr>
                <tr><td class="p-2.5 font-bold">M</td><td class="p-2.5">39–41"</td><td class="p-2.5">32–34"</td><td class="p-2.5">28"</td></tr>
                <tr><td class="p-2.5 font-bold">L</td><td class="p-2.5">42–44"</td><td class="p-2.5">34–36"</td><td class="p-2.5">29"</td></tr>
                <tr><td class="p-2.5 font-bold">XL</td><td class="p-2.5">45–47"</td><td class="p-2.5">36–38"</td><td class="p-2.5">30"</td></tr>
                <tr><td class="p-2.5 font-bold">XXL</td><td class="p-2.5">48–50"</td><td class="p-2.5">38–40"</td><td class="p-2.5">31"</td></tr>
              </tbody>
            </table>
          </div>
          <button @click="showSizeGuide = false" class="btn-primary w-full justify-center">Got It</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Star, ShoppingCart, Heart, Minus, Plus, Zap,
  Truck, ShieldCheck, RotateCcw, ChevronDown, Ruler, X
} from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore.js'
import { useWishlistStore } from '../../stores/wishlistStore.js'
import { useUiStore } from '../../stores/uiStore.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const uiStore = useUiStore()

const selectedSize = ref('')
const sizeError = ref(false)
const selectedColor = ref(props.product.colors?.[0] || '')
const qty = ref(1)
const openAccordion = ref('Product Details & Specs')
const showSizeGuide = ref(false)

const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))

const currentPrice = computed(() => props.product.price || props.product.salePrice)
const originalDisplayPrice = computed(() => props.product.originalPrice || (props.product.salePrice ? props.product.price : null))
const hasDiscount = computed(() => originalDisplayPrice.value && originalDisplayPrice.value > currentPrice.value)
const savingsAmount = computed(() => hasDiscount.value ? originalDisplayPrice.value - currentPrice.value : 0)

const accordions = [
  {
    title: 'Product Details & Specs',
    content: props.product.description || 'High-performance athletic gear engineered for serious fitness training.'
  },
  {
    title: 'Size Guide',
    content: ''
  },
  {
    title: 'Shipping Information',
    content: 'All orders placed before 2 PM IST are dispatched the same day. Standard delivery delivers within 2–4 business days across India. Express shipping is free on orders above Rs. 999.'
  },
  {
    title: 'Return & Exchange Information',
    content: 'We offer an easy 7-day return and exchange policy from the date of delivery. Items must be unwashed, unused, and in their original packaging with tags intact.'
  },
  {
    title: 'Customer Reviews',
    content: ''
  }
]

function selectSize(size) {
  selectedSize.value = size
  sizeError.value = false
}

function validateSelection() {
  if (props.product.sizes && props.product.sizes.length > 0 && !selectedSize.value) {
    sizeError.value = true
    uiStore.showNotification('Please select a size first', 'error')
    return false
  }
  if (props.product.stock <= 0) {
    uiStore.showNotification('Sorry, this product is currently out of stock', 'error')
    return false
  }
  return true
}

function addToCart() {
  if (!validateSelection()) return

  cartStore.addItem(props.product, {
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: qty.value
  })
  uiStore.showNotification(`${props.product.name} added to cart`, 'success')
}

function buyNow() {
  if (!validateSelection()) return

  cartStore.addItem(props.product, {
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: qty.value
  })
  cartStore.closeCart()
  router.push('/checkout')
}

function toggleWishlist() {
  wishlistStore.toggleWishlist(props.product)
  uiStore.showNotification(
    isWishlisted.value ? 'Removed from wishlist' : 'Added to wishlist',
    'success'
  )
}
</script>
