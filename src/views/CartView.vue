<template>
  <div class="min-h-screen bg-brand-black">
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 class="text-brand-white font-black text-3xl md:text-4xl mb-10">Shopping Cart</h1>

      <div v-if="cartStore.items.length > 0" class="grid lg:grid-cols-3 gap-12">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.key"
            class="flex gap-5 p-5 bg-brand-charcoal rounded border border-white/[0.06]"
          >
            <RouterLink :to="`/product/${item.slug}`">
              <img :src="item.thumbnail" :alt="item.name" class="w-24 h-28 object-cover rounded bg-brand-gray flex-shrink-0" loading="lazy" />
            </RouterLink>
            <div class="flex-1 min-w-0">
              <RouterLink :to="`/product/${item.slug}`" class="text-brand-white font-semibold text-base hover:text-brand-red transition-colors">{{ item.name }}</RouterLink>
              <div class="text-brand-silver/50 text-sm mt-1 flex gap-3">
                <span v-if="item.size">Size: {{ item.size }}</span>
                <span v-if="item.color">Color: {{ item.color }}</span>
              </div>
              <div class="flex items-center justify-between mt-4">
                <QuantitySelector
                  :modelValue="item.quantity"
                  @update:modelValue="cartStore.updateQuantity(item.key, $event)"
                />
                <span class="text-brand-white font-bold text-lg">Rs. {{ ((item.salePrice || item.price) * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
            <button @click="cartStore.removeItem(item.key)" class="text-brand-silver/40 hover:text-brand-red transition-colors self-start" aria-label="Remove">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div>
          <div class="bg-brand-charcoal rounded border border-white/[0.06] p-7 sticky top-24">
            <h2 class="text-brand-white font-bold text-xl mb-6">Order Summary</h2>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-brand-silver/70 text-sm">
                <span>Subtotal</span>
                <span>Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-brand-silver/70 text-sm">
                <span>Shipping</span>
                <span :class="cartStore.subtotal >= 999 ? 'text-green-400' : ''">
                  {{ cartStore.subtotal >= 999 ? 'Free' : 'Rs. 99' }}
                </span>
              </div>
              <div class="flex justify-between text-brand-white font-bold text-lg border-t border-white/10 pt-4">
                <span>Total</span>
                <span>Rs. {{ (cartStore.subtotal >= 999 ? cartStore.subtotal : cartStore.subtotal + 99).toLocaleString() }}</span>
              </div>
            </div>
            <RouterLink to="/checkout" class="btn-primary w-full justify-center mb-3">Proceed to Checkout</RouterLink>
            <RouterLink to="/shop" class="btn-ghost w-full justify-center">Continue Shopping</RouterLink>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="py-28 text-center">
        <ShoppingBag :size="56" class="mx-auto text-brand-silver/15 mb-6" />
        <h2 class="text-brand-white font-bold text-2xl mb-3">Your cart is empty</h2>
        <p class="text-brand-silver/50 text-base mb-8">Add some premium gear to your cart and gear up.</p>
        <RouterLink to="/shop" class="btn-primary">Shop Now</RouterLink>
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
