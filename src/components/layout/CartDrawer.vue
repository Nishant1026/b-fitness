<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div
      class="drawer-overlay"
      :class="{
        open: cartStore.isOpen,
        'pointer-events-none': !cartStore.isOpen,
        'pointer-events-auto': cartStore.isOpen,
      }"
      @click="cartStore.closeCart()"
      aria-hidden="true"
    ></div>

    <!-- Drawer -->
    <div
      class="drawer-panel w-full max-w-md"
      :class="{ open: cartStore.isOpen }"
      role="dialog"
      aria-label="Shopping cart"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-brand-border flex-shrink-0">
        <div class="flex items-center gap-3">
          <ShoppingBag :size="20" class="text-brand-muted" />
          <h2 class="text-brand-text font-bold text-lg">Your Cart</h2>
          <span class="text-brand-muted text-sm">({{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'items' }})</span>
        </div>
        <button @click="cartStore.closeCart()" class="p-2 text-brand-muted hover:text-brand-text transition-colors rounded-lg hover:bg-brand-surface" aria-label="Close cart">
          <X :size="20" />
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-48 text-center">
          <ShoppingBag :size="40" class="text-brand-border-2 mb-4" />
          <p class="text-brand-muted text-base font-medium">Your cart is empty</p>
          <p class="text-brand-subtle text-sm mt-1">Add some items to get started</p>
          <RouterLink to="/shop" @click="cartStore.closeCart()" class="btn-primary mt-6 py-3 px-6 text-sm">Shop Now</RouterLink>
        </div>

        <TransitionGroup name="cart-item">
          <div
            v-for="item in cartStore.items"
            :key="item.key"
            class="flex gap-4 p-3 rounded-xl bg-brand-surface border border-brand-border group"
          >
            <!-- Image -->
            <RouterLink :to="`/product/${item.slug}`" @click="cartStore.closeCart()" class="flex-shrink-0">
              <img
                :src="item.thumbnail"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-xl bg-brand-surface"
                loading="lazy"
              />
            </RouterLink>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <RouterLink :to="`/product/${item.slug}`" @click="cartStore.closeCart()" class="text-brand-text font-semibold text-sm leading-tight hover:text-brand-red transition-colors line-clamp-2">
                {{ item.name }}
              </RouterLink>
              <div class="flex gap-3 mt-1 text-xs text-brand-muted">
                <span v-if="item.size">Size: {{ item.size }}</span>
                <span v-if="item.color">Color: {{ item.color }}</span>
              </div>

              <!-- Qty + Price row -->
              <div class="flex items-center justify-between mt-2.5">
                <!-- Qty controls -->
                <div class="flex items-center gap-0 border border-brand-border rounded-lg overflow-hidden">
                  <button
                    @click="cartStore.updateQuantity(item.key, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus :size="12" />
                  </button>
                  <span class="w-8 text-center text-brand-text text-sm font-medium">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(item.key, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus :size="12" />
                  </button>
                </div>

                <!-- Price -->
                <span class="text-brand-text font-bold text-sm">Rs. {{ ((item.salePrice || item.price) * item.quantity).toLocaleString() }}</span>
              </div>
            </div>

            <!-- Remove -->
            <button
              @click="cartStore.removeItem(item.key)"
              class="flex-shrink-0 self-start mt-1 p-1 text-brand-subtle hover:text-brand-red transition-colors"
              aria-label="Remove item"
            >
              <Trash2 :size="15" />
            </button>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-brand-border px-6 py-5 space-y-3 flex-shrink-0">
        <!-- Subtotals -->
        <div class="flex justify-between text-sm text-brand-muted">
          <span>Subtotal</span>
          <span>Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between text-sm text-brand-muted">
          <span>Shipping</span>
          <span :class="cartStore.subtotal >= 999 ? 'text-green-600 font-semibold' : ''">
            {{ cartStore.subtotal >= 999 ? 'Free' : 'Rs. 99' }}
          </span>
        </div>
        <div class="flex justify-between text-brand-text font-bold text-lg border-t border-brand-border pt-3">
          <span>Total</span>
          <span>Rs. {{ (cartStore.subtotal >= 999 ? cartStore.subtotal : cartStore.subtotal + 99).toLocaleString() }}</span>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col gap-2.5 pt-1">
          <RouterLink to="/checkout" @click="cartStore.closeCart()" class="btn-primary w-full text-center justify-center">
            Checkout
          </RouterLink>
          <RouterLink to="/cart" @click="cartStore.closeCart()" class="btn-secondary w-full text-center justify-center py-3">
            View Cart
          </RouterLink>
        </div>

        <p class="text-center text-brand-subtle text-xs">Secure checkout powered by B-FIT</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore.js'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.cart-item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
  max-height: 0;
}
</style>
