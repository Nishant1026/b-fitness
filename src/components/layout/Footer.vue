<template>
  <footer class="bg-white border-t border-brand-border">
    <!-- Newsletter Strip -->
    <div class="bg-brand-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="text-brand-gold text-xs tracking-[0.3em] uppercase font-semibold mb-1">Stay In The Loop</p>
          <h3 class="text-white font-black text-xl md:text-2xl">Get Exclusive Deals & New Arrivals</h3>
        </div>
        <div class="flex w-full md:w-auto gap-2 max-w-sm">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
          />
          <button @click="subscribe" class="btn-primary px-5 py-3 flex-shrink-0 text-xs whitespace-nowrap">Subscribe</button>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Col 1: Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="inline-flex items-center gap-2.5 mb-5 group">
            <div class="w-9 h-9 flex items-center justify-center rounded-full bg-brand-red group-hover:bg-brand-red-dark transition-colors duration-300">
              <span class="text-white font-black text-sm">B</span>
            </div>
            <div>
              <div class="text-brand-text font-black text-base tracking-widest uppercase">B-FIT</div>
              <div class="text-brand-muted text-[9px] tracking-[0.2em] uppercase">Sports &amp; Supplements</div>
            </div>
          </RouterLink>
          <p class="text-brand-muted text-sm leading-relaxed mb-6">
            Premium athletic wear and sports supplements built for those who train with purpose. Performance, style, and durability — uncompromised.
          </p>
          <!-- Social -->
          <div class="flex items-center gap-2.5">
            <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank" rel="noopener noreferrer"
              :aria-label="social.label"
              class="w-9 h-9 flex items-center justify-center rounded-full border border-brand-border text-brand-muted hover:text-white hover:bg-brand-red hover:border-brand-red transition-all duration-300"
            >
              <component :is="social.icon" :size="15" />
            </a>
          </div>
        </div>

        <!-- Col 2: Shop -->
        <div>
          <h4 class="text-brand-text font-black text-xs tracking-widest uppercase mb-5">Shop</h4>
          <ul class="space-y-2.5">
            <li v-for="link in shopLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-brand-muted hover:text-brand-red text-sm transition-colors duration-300">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Support -->
        <div>
          <h4 class="text-brand-text font-black text-xs tracking-widest uppercase mb-5">Support</h4>
          <ul class="space-y-2.5">
            <li v-for="link in supportLinks" :key="link.label">
              <RouterLink :to="link.to" class="text-brand-muted hover:text-brand-red text-sm transition-colors duration-300">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact -->
        <div>
          <h4 class="text-brand-text font-black text-xs tracking-widest uppercase mb-5">Contact Us</h4>
          <div class="space-y-3 mb-6">
            <a href="tel:+919876543210" class="flex items-center gap-2.5 text-brand-muted hover:text-brand-red text-sm transition-colors">
              <Phone :size="14" class="flex-shrink-0" />
              +91 98765 43210
            </a>
            <a href="mailto:support@bfitsports.com" class="flex items-center gap-2.5 text-brand-muted hover:text-brand-red text-sm transition-colors">
              <Mail :size="14" class="flex-shrink-0" />
              support@bfitsports.com
            </a>
            <div class="flex items-start gap-2.5 text-brand-muted text-sm">
              <MapPin :size="14" class="flex-shrink-0 mt-0.5" />
              B-FIT Sports, Sector 14, New Delhi, India
            </div>
          </div>
          <!-- Account quick links -->
          <div class="space-y-2.5">
            <RouterLink v-for="link in accountLinks" :key="link.label" :to="link.to" class="block text-brand-muted hover:text-brand-red text-sm transition-colors duration-300">
              {{ link.label }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust strip -->
    <div class="border-t border-brand-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-wrap justify-center gap-6 md:gap-10">
          <div v-for="trust in trusts" :key="trust.label" class="flex items-center gap-2">
            <component :is="trust.icon" :size="16" class="text-brand-red flex-shrink-0" />
            <span class="text-brand-muted text-xs font-medium">{{ trust.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-brand-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <p class="text-brand-muted text-xs text-center md:text-left">
          &copy; {{ year }} B-FIT Sports &amp; Supplements. All Rights Reserved.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <RouterLink v-for="policy in policyLinks" :key="policy.label" :to="policy.to"
            class="text-brand-muted hover:text-brand-red text-xs transition-colors">
            {{ policy.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle, Shield, Truck, RefreshCw, Award, Lock } from 'lucide-vue-next'

const year = computed(() => new Date().getFullYear())
const email = ref('')

function subscribe() {
  if (email.value) {
    alert(`Thank you for subscribing with ${email.value}!`)
    email.value = ''
  }
}

const socials = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'YouTube', href: '#', icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/919876543210', icon: MessageCircle },
]

const shopLinks = [
  { to: '/shop/sports-clothing', label: 'T-Shirts & Tees' },
  { to: '/shop/sports-clothing', label: 'Track Suits' },
  { to: '/shop/performance-bottomwear', label: 'Track Pants' },
  { to: '/shop/performance-bottomwear', label: 'Shorts' },
  { to: '/shop/gym-accessories', label: 'Gym Accessories' },
  { to: '/shop/sports-supplements', label: 'Supplements' },
  { to: '/offers', label: 'Sale & Offers' },
]

const supportLinks = [
  { to: '/contact', label: 'Contact Us' },
  { to: '/contact', label: 'Shipping Policy' },
  { to: '/contact', label: 'Returns & Exchanges' },
  { to: '/contact', label: 'FAQs' },
  { to: '/contact', label: 'Size Guide' },
]

const accountLinks = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Create Account' },
  { to: '/wishlist', label: 'My Wishlist' },
  { to: '/account', label: 'My Orders' },
]

const trusts = [
  { icon: Shield, label: 'Premium Quality Guaranteed' },
  { icon: Truck, label: 'Free Shipping above Rs. 999' },
  { icon: RefreshCw, label: '15-Day Easy Returns' },
  { icon: Award, label: '10,000+ Happy Athletes' },
  { icon: Lock, label: 'Secure Payments' },
]

const policyLinks = [
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms & Conditions' },
  { to: '/contact', label: 'Shipping Policy' },
  { to: '/contact', label: 'Refund Policy' },
]
</script>
