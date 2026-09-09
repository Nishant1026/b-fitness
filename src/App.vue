<template>
  <div id="app-root">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from './stores/cartStore.js'
import { useWishlistStore } from './stores/wishlistStore.js'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

onMounted(() => {
  cartStore.loadFromStorage()
  wishlistStore.loadFromStorage()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
