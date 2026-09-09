<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <!-- Left: Image stack -->
        <div class="relative reveal-left">
          <div class="relative z-10 rounded-2xl overflow-hidden shadow-card-hover" style="aspect-ratio: 4/5;">
            <img
              src="https://images.unsplash.com/photo-1534438327-3d159c1dcdd3?w=800&q=85"
              alt="Athletes training in B-FIT wear"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <!-- Floating stats card -->
          <div class="absolute -bottom-6 -right-4 md:right-[-5%] bg-white rounded-2xl shadow-card-hover p-5 z-20 min-w-[160px] reveal" style="animation-delay:0.4s">
            <p class="text-brand-red font-black text-2xl">10K+</p>
            <p class="text-brand-muted text-xs font-medium mt-0.5">Happy Athletes</p>
          </div>
          <!-- Red accent box -->
          <div class="absolute top-4 -left-4 md:left-[-5%] w-20 h-20 bg-brand-red rounded-2xl z-0 opacity-90"></div>
        </div>

        <!-- Right: Text content -->
        <div class="reveal-right">
          <p class="text-brand-red text-xs tracking-[0.35em] uppercase font-semibold mb-4">Our Story</p>
          <h2 class="font-display text-brand-text text-4xl md:text-5xl xl:text-6xl tracking-wide uppercase leading-none mb-6">
            WHY CHOOSE<br />
            <span class="text-brand-red">B-FIT?</span>
          </h2>
          <p class="text-brand-body text-base leading-relaxed mb-6">
            B-FIT was built by athletes, for athletes. Every product is designed with one goal in mind — helping you perform better.
            We believe premium performance gear shouldn't cost a fortune, and quality shouldn't be compromised.
          </p>
          <p class="text-brand-body text-base leading-relaxed mb-8">
            From elite moisture-wicking fabrics to precision-cut silhouettes — every detail is engineered to support your training.
          </p>

          <!-- Benefits grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div v-for="benefit in benefits" :key="benefit.label" class="flex items-start gap-3">
              <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-brand-red/8 mt-0.5">
                <component :is="benefit.icon" :size="15" class="text-brand-red" />
              </div>
              <div>
                <p class="text-brand-text font-bold text-sm">{{ benefit.label }}</p>
                <p class="text-brand-muted text-xs mt-0.5">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <RouterLink to="/shop" class="btn-primary">Shop Collection</RouterLink>
            <RouterLink to="/contact" class="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1.5">
              Our Story <ArrowRight :size="13" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Shield, Zap, Award, RefreshCw, ArrowRight } from 'lucide-vue-next'

const benefits = [
  { icon: Zap,       label: 'Performance Fabrics',   desc: 'Elite moisture-wicking materials' },
  { icon: Shield,    label: '100% Authentic',         desc: 'Quality-tested every product' },
  { icon: Award,     label: 'Made for Athletes',      desc: 'Designed by real athletes' },
  { icon: RefreshCw, label: 'Easy Returns',           desc: '15-day hassle-free policy' },
]
</script>
