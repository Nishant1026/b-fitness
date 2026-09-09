<template>
  <article
    class="group relative bg-white rounded-2xl overflow-hidden border border-brand-border hover:border-brand-border-2 hover:shadow-card-hover transition-all duration-400 flex flex-col"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden bg-brand-surface" style="aspect-ratio: 1 / 1;">
      <RouterLink :to="`/product/${product.slug}`" class="block w-full h-full">
        <img
          :src="product.thumbnail || product.images?.[0]"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-700 ease-premium"
          :class="hovering ? 'scale-110' : 'scale-100'"
          loading="lazy"
        />
        <!-- Hover image -->
        <img
          v-if="product.images?.[1]"
          :src="product.images[1]"
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-premium"
          :class="hovering ? 'opacity-100' : 'opacity-0'"
          loading="lazy"
        />
      </RouterLink>

      <!-- Top Left Badge -->
      <div class="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
        <span
          v-if="product.bestseller"
          class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-brand-dark text-white rounded-md shadow-sm"
        >
          <TrendingUp :size="9" />
          Best Seller
        </span>
        <span
          v-else-if="product.badge === 'new'"
          class="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-brand-red text-white rounded-md shadow-sm"
        >New</span>
        <span
          v-else-if="product.badge === 'featured'"
          class="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-white text-brand-text border border-brand-border rounded-md shadow-sm"
        >Featured</span>
      </div>

      <!-- Discount Badge Top Right -->
      <div
        v-if="product.discount > 0"
        class="absolute top-2.5 right-2.5 px-2 py-1 text-[11px] font-black bg-brand-red text-white rounded-md shadow-sm"
      >
        -{{ product.discount }}%
      </div>

      <!-- Wishlist icon -->
      <button
        @click.prevent="handleWishlist"
        class="absolute bottom-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-brand-border shadow-sm hover:border-brand-red transition-all duration-300"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
      >
        <Heart
          :size="14"
          :class="isWishlisted ? 'text-brand-red fill-brand-red' : 'text-brand-muted'"
          class="transition-colors duration-300"
        />
      </button>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col flex-1 p-3 md:p-4">
      <!-- Sub-category label -->
      <p class="text-brand-subtle text-[10px] tracking-widest uppercase font-semibold mb-1 line-clamp-1">
        {{ product.subCategory }}
      </p>

      <!-- Name -->
      <RouterLink :to="`/product/${product.slug}`" class="block mb-2">
        <h3 class="text-brand-text font-bold text-sm leading-snug hover:text-brand-red transition-colors duration-300 line-clamp-2">
          {{ product.name }}
        </h3>
      </RouterLink>

      <!-- Rating -->
      <div class="flex items-center gap-1.5 mb-2">
        <div class="flex gap-0.5">
          <Star
            v-for="i in 5"
            :key="i"
            :size="10"
            :class="i <= Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-border-2'"
          />
        </div>
        <span class="text-brand-muted text-[10px]">({{ product.reviewCount }})</span>
      </div>

      <!-- Sizes row -->
      <div v-if="product.sizes?.length" class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="size in product.sizes.slice(0, 4)"
          :key="size"
          class="px-1.5 py-0.5 text-[9px] font-semibold border border-brand-border text-brand-muted rounded-md tracking-wide"
        >{{ size }}</span>
        <span v-if="product.sizes.length > 4" class="px-1.5 py-0.5 text-[9px] text-brand-muted">+{{ product.sizes.length - 4 }}</span>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Price Row -->
      <div class="flex items-end justify-between mb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-brand-text font-black text-base leading-none">
              Rs. {{ (product.salePrice || product.price).toLocaleString() }}
            </span>
            <span v-if="product.salePrice" class="text-brand-muted text-xs line-through leading-none">
              Rs. {{ product.price.toLocaleString() }}
            </span>
          </div>
          <div v-if="product.salePrice" class="mt-1">
            <span class="text-green-600 text-[10px] font-semibold">
              Save Rs. {{ (product.price - product.salePrice).toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.prevent="handleAddToCart"
        class="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-text hover:bg-brand-red active:scale-[0.98] text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300"
      >
        <ShoppingCart :size="13" />
        Add to Cart
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, Star, ShoppingCart, TrendingUp } from 'lucide-vue-next'
import { useWishlistStore } from '../../stores/wishlistStore.js'
import { useCartStore } from '../../stores/cartStore.js'
import { useUiStore } from '../../stores/uiStore.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

const hovering = ref(false)
const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))

function handleWishlist() {
  wishlistStore.toggleWishlist(props.product)
  uiStore.showNotification(
    isWishlisted.value ? 'Removed from wishlist' : `${props.product.name} added to wishlist`,
    'success'
  )
}

function handleAddToCart() {
  const defaultSize = props.product.sizes?.[0]
  const defaultColor = props.product.colors?.[0]
  cartStore.addItem(props.product, { size: defaultSize, color: defaultColor })
  uiStore.showNotification(`${props.product.name} added to cart`, 'success')
}
</script>
