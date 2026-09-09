<template>
  <!-- Infinite scroll marquee testimonials like fuaark.com -->
  <section class="py-20 md:py-28 bg-brand-surface overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="reveal text-center">
        <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-semibold mb-2">Athletes Love Us</p>
        <h2 class="font-display text-brand-text text-4xl md:text-5xl tracking-wide uppercase">What Our Customers Say</h2>
      </div>
    </div>

    <!-- Marquee Row 1 (left-to-right) -->
    <div class="relative mb-4 overflow-hidden">
      <div class="flex gap-4 animate-scroll-x" style="width: max-content;">
        <div
          v-for="(review, i) in [...reviews, ...reviews]"
          :key="`r1-${i}`"
          class="flex-shrink-0 w-72 bg-white border border-brand-border rounded-2xl p-5 shadow-sm"
        >
          <!-- Stars -->
          <div class="flex gap-0.5 mb-3">
            <Star v-for="s in 5" :key="s" :size="13" class="text-brand-gold fill-brand-gold" />
          </div>
          <p class="text-brand-body text-sm leading-relaxed mb-4">"{{ review.text }}"</p>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <span class="text-brand-red font-black text-xs">{{ review.name[0] }}</span>
            </div>
            <div>
              <p class="text-brand-text font-bold text-xs">{{ review.name }}</p>
              <p class="text-brand-muted text-[10px]">{{ review.product }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Marquee Row 2 (right-to-left, faster) -->
    <div class="relative overflow-hidden">
      <div class="flex gap-4" style="width: max-content; animation: scrollX 28s linear infinite reverse;">
        <div
          v-for="(review, i) in [...reviews2, ...reviews2]"
          :key="`r2-${i}`"
          class="flex-shrink-0 w-72 bg-white border border-brand-border rounded-2xl p-5 shadow-sm"
        >
          <!-- Stars -->
          <div class="flex gap-0.5 mb-3">
            <Star v-for="s in 5" :key="s" :size="13" class="text-brand-gold fill-brand-gold" />
          </div>
          <p class="text-brand-body text-sm leading-relaxed mb-4">"{{ review.text }}"</p>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
              <span class="text-brand-red font-black text-xs">{{ review.name[0] }}</span>
            </div>
            <div>
              <p class="text-brand-text font-bold text-xs">{{ review.name }}</p>
              <p class="text-brand-muted text-[10px]">{{ review.product }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next'

const reviews = [
  { name: 'Rahul M.', product: 'Pro Performance T-Shirt', text: 'Best gym tee I\'ve ever owned. The moisture-wicking is insane — stayed dry through a brutal leg day session.' },
  { name: 'Priya S.', product: 'Women Core Performance Tee', text: 'Finally a workout top that actually fits right. Feels premium and the stretch is perfect for yoga and HIIT.' },
  { name: 'Arjun K.', product: 'Velocity Track Pant', text: 'These track pants are a game changer. Lightweight and the fit is exactly what I needed for sprint training.' },
  { name: 'Neha R.', product: 'Elite Track Suit', text: 'Worth every rupee. The fabric quality is exceptional and the cut is super athletic. Gets so many compliments at the gym.' },
  { name: 'Vikram P.', product: 'Power Stringer Vest', text: 'Ultra light and breathable. Perfect for heavy lifts. The B-FIT quality is genuinely on par with international brands.' },
]

const reviews2 = [
  { name: 'Anjali T.', product: 'Women Training Shorts', text: 'High-rise fit is perfect and the waistband stays in place throughout intense workouts. Absolutely love it!' },
  { name: 'Siddharth L.', product: 'Pro Training Shorts', text: 'Bought 3 pairs already. The built-in liner is so comfortable and the material feels premium, not cheap at all.' },
  { name: 'Kavya N.', product: 'Compression Knee Sleeves', text: 'These knee sleeves have totally changed my squat game. Perfect compression and very durable after months of use.' },
  { name: 'Rohit C.', product: 'Pro Gym Duffel Bag', text: 'The ventilated shoe compartment is the best feature. Super spacious and the zippers feel premium. Built to last.' },
  { name: 'Sneha M.', product: 'Stainless Steel Bottle', text: 'Keeps my drink cold for hours. The matte finish looks so clean and it hasn\'t leaked once. Highly recommend!' },
]
</script>

<style>
@keyframes scrollX {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-x {
  animation: scrollX 40s linear infinite;
}
</style>
