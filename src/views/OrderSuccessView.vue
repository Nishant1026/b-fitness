<template>
  <div class="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
    <!-- Success Checkmark -->
    <div class="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mb-8 animate-pulse">
      <CheckCircle :size="48" class="text-green-400" />
    </div>

    <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-bold mb-4">Order Confirmed</p>
    <h1 class="text-brand-white font-black text-4xl md:text-5xl mb-5">Thank You!</h1>
    <p class="text-brand-silver/70 text-base max-w-md leading-relaxed mb-10">
      Your order has been placed successfully. You'll receive a confirmation email shortly with tracking details.
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <RouterLink to="/shop" class="btn-primary">Continue Shopping</RouterLink>
      <RouterLink to="/" class="btn-secondary">Back to Home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next'
</script>
