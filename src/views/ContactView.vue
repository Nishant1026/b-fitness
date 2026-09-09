<template>
  <div class="min-h-screen bg-brand-black">
    <TopBar />
    <Header />
    <MobileMenu />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="max-w-2xl mx-auto">
        <Breadcrumb :items="[{ label: 'Contact' }]" class="mb-8" />
        <p class="text-brand-red text-xs tracking-[0.4em] uppercase font-bold mb-4">Get In Touch</p>
        <h1 class="text-brand-white font-black text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p class="text-brand-silver/60 text-base mb-12">Have a question about a product, order, or just want to say hi? We'd love to hear from you.</p>

        <!-- Contact Cards -->
        <div class="grid sm:grid-cols-3 gap-5 mb-12">
          <a v-for="c in contacts" :key="c.label" :href="c.href" class="flex flex-col items-center text-center p-6 bg-brand-charcoal rounded border border-white/[0.06] hover:border-white/15 transition-all duration-300 group">
            <div class="w-11 h-11 flex items-center justify-center rounded bg-brand-red/10 border border-brand-red/25 mb-4 group-hover:bg-brand-red/20 transition-colors">
              <component :is="c.icon" :size="20" class="text-brand-red" />
            </div>
            <p class="text-brand-silver/50 text-xs uppercase tracking-widest mb-2">{{ c.label }}</p>
            <p class="text-brand-white font-semibold text-sm">{{ c.value }}</p>
          </a>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Full Name</label>
              <input v-model="form.name" type="text" class="input-premium" placeholder="John Doe" required />
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Email</label>
              <input v-model="form.email" type="email" class="input-premium" placeholder="john@example.com" required />
            </div>
          </div>
          <div>
            <label class="text-brand-silver/70 text-sm mb-2 block">Subject</label>
            <input v-model="form.subject" type="text" class="input-premium" placeholder="Order inquiry, product question, etc." />
          </div>
          <div>
            <label class="text-brand-silver/70 text-sm mb-2 block">Message</label>
            <textarea v-model="form.message" class="input-premium h-40 resize-none" placeholder="Your message..." required></textarea>
          </div>
          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center">
            <Loader2 v-if="loading" :size="18" class="animate-spin" />
            <template v-else><Send :size="18" /> Send Message</template>
          </button>
          <p v-if="sent" class="text-green-400 text-center text-sm font-medium">✓ Message sent! We'll get back to you within 24 hours.</p>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import Footer from '../components/layout/Footer.vue'
import Breadcrumb from '../components/common/Breadcrumb.vue'

const form = ref({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const sent = ref(false)

const contacts = [
  { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', icon: Phone },
  { label: 'Email', value: 'support@bfitsports.com', href: 'mailto:support@bfitsports.com', icon: Mail },
  { label: 'Address', value: 'Mumbai, Maharashtra', href: '#', icon: MapPin },
]

async function submitForm() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
  sent.value = true
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>
