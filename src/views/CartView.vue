<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 class="text-brand-text font-black text-2xl md:text-4xl mb-8">Shopping Cart</h1>

      <div v-if="cartStore.items.length > 0" class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.key"
            class="flex gap-4 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl border border-brand-border shadow-sm items-center"
          >
            <RouterLink :to="`/product/${item.slug}`" class="flex-shrink-0">
              <img :src="item.thumbnail" :alt="item.name" class="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-brand-surface" loading="lazy" />
            </RouterLink>
            <div class="flex-1 min-w-0">
              <RouterLink :to="`/product/${item.slug}`" class="text-brand-text font-bold text-sm sm:text-base hover:text-brand-red transition-colors line-clamp-2">
                {{ item.name }}
              </RouterLink>
              <div class="text-brand-muted text-xs sm:text-sm mt-1 flex flex-wrap gap-3">
                <span v-if="item.size" class="font-medium">Size: <strong class="text-brand-text">{{ item.size }}</strong></span>
                <span v-if="item.color" class="font-medium">Color: <strong class="text-brand-text">{{ item.color }}</strong></span>
              </div>
              <div class="flex items-center justify-between mt-3 sm:mt-4">
                <QuantitySelector
                  :modelValue="item.quantity"
                  @update:modelValue="cartStore.updateQuantity(item.key, $event)"
                />
                <span class="text-brand-text font-black text-base sm:text-lg">Rs. {{ ((item.price || item.salePrice) * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            <button @click="cartStore.removeItem(item.key)" class="text-brand-muted hover:text-brand-red transition-colors self-start p-1.5 rounded-lg" aria-label="Remove item">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div>
          <div class="bg-white rounded-2xl border border-brand-border p-6 sm:p-7 sticky top-24 shadow-sm">
            <h2 class="text-brand-text font-bold text-xl mb-5">Order Summary</h2>
            <div class="space-y-3 mb-6 text-sm">
              <div class="flex justify-between text-brand-body">
                <span>Original Subtotal</span>
                <span>Rs. {{ cartStore.originalSubtotal.toLocaleString() }}</span>
              </div>
              <div v-if="cartStore.totalDiscount > 0" class="flex justify-between text-green-600 font-semibold">
                <span>Discount Savings</span>
                <span>-Rs. {{ cartStore.totalDiscount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-brand-body">
                <span>Subtotal</span>
                <span>Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-brand-body">
                <span>Shipping</span>
                <span :class="cartStore.shipping === 0 ? 'text-green-600 font-bold' : ''">
                  {{ cartStore.shipping === 0 ? 'FREE' : 'Rs. 99' }}
                </span>
              </div>
              <div class="flex justify-between text-brand-text font-black text-lg border-t border-brand-border pt-4">
                <span>Total Amount</span>
                <span>Rs. {{ cartStore.total.toLocaleString() }}</span>
              </div>
            </div>
            <RouterLink to="/checkout" class="btn-primary w-full justify-center mb-3 py-3.5 text-sm font-bold tracking-widest uppercase">Proceed to Checkout</RouterLink>
            <RouterLink to="/shop" class="btn-secondary w-full justify-center text-xs">Continue Shopping</RouterLink>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="py-24 text-center">
        <ShoppingBag :size="56" class="mx-auto text-brand-muted/30 mb-5" />
        <h2 class="text-brand-text font-black text-2xl mb-2">Your cart is empty</h2>
        <p class="text-brand-muted text-sm sm:text-base mb-8">Explore our new arrivals and gear up for your next PR.</p>
        <RouterLink to="/shop" class="btn-primary">Browse All Products</RouterLink>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ShoppingBag, Trash2 } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import QuantitySelector from '../components/ui/QuantitySelector.vue'
import { useCartStore } from '../stores/cartStore.js'

const cartStore = useCartStore()
</script>
