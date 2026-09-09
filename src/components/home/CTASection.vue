<template>
  <section class="relative flex items-center justify-center overflow-hidden bg-black py-20 md:py-28">
    <!-- Background image with parallax -->
    <div class="absolute inset-0 h-full w-full" :style="{ transform: `translateY(${Math.min(offset * 0.25, 20)}px)` }">
      <img
        src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=80"
        alt="Athlete training intensely"
        class="block w-full h-full object-cover scale-110"
        loading="lazy"
      />
    </div>
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/82"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/88 via-black/50 to-black/70"></div>

    <!-- Red glow orb -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] bg-brand-red/15 pointer-events-none"></div>

    <div class="relative z-10 flex w-full max-w-7xl mx-auto flex-col items-center px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-brand-gold text-xs tracking-[0.45em] uppercase font-semibold mb-6 reveal">The B-FIT Commitment</p>

      <h2 class="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-8 reveal" style="letter-spacing:0.03em;">
        TRAIN HARD.<br />
        <span class="text-brand-red">WEAR B-FIT.</span><br />
        BE UNSTOPPABLE.
      </h2>

      <p class="text-white/65 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 reveal">
        Every piece of B-FIT gear is a statement — a commitment to training, to performance, to never settling for second best.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center reveal">
        <RouterLink to="/shop" class="btn-primary">Shop Now</RouterLink>
        <RouterLink to="/offers" class="btn-outline-white">View Offers</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useParallax } from '../../composables/useParallax.js'

const { offset } = useParallax(0.2)
</script>
