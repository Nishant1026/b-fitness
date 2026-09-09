<template>
  <div class="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
    <p class="text-brand-red text-xs tracking-[0.4em] uppercase font-bold mb-4">404 Error</p>
    <h1 class="text-brand-white font-black text-8xl md:text-9xl leading-none mb-6 opacity-10">404</h1>
    <h2 class="text-brand-white font-black text-3xl md:text-4xl -mt-16 mb-5">Page Not Found</h2>
    <p class="text-brand-silver/50 text-base max-w-md mb-10">
      The page you're looking for doesn't exist or has been moved. Let's get you back on track.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <RouterLink to="/" class="btn-primary">
        <Home :size="18" /> Go Home
      </RouterLink>
      <RouterLink to="/shop" class="btn-secondary">
        Browse Shop
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { Home } from 'lucide-vue-next'
</script>
