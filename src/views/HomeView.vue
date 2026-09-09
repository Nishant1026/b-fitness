<template>
  <div>
    <TopBar />
    <Header />
    <MobileMenu />
    <CartDrawer />

    <main class="pt-16">
      <HeroSlider />
      <TrustBadges />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseBfit />
      <BestSellers />
      <Testimonials />
      <CTASection />
    </main>

    <Footer />

    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="uiStore.notification"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 rounded-xl bg-white border border-brand-border text-brand-text text-sm font-medium shadow-card-hover flex items-center gap-3"
          style="box-shadow: 0 8px 32px rgba(0,0,0,0.15)"
        >
          <CheckCircle :size="16" class="text-green-400 flex-shrink-0" />
          {{ uiStore.notification.message }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import CartDrawer from '../components/layout/CartDrawer.vue'
import Footer from '../components/layout/Footer.vue'
import HeroSlider from '../components/home/HeroSlider.vue'
import TrustBadges from '../components/home/TrustBadges.vue'
import CategorySection from '../components/home/CategorySection.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import WhyChooseBfit from '../components/home/WhyChooseBfit.vue'
import BestSellers from '../components/home/BestSellers.vue'
import Testimonials from '../components/home/Testimonials.vue'
import CTASection from '../components/home/CTASection.vue'
import { useUiStore } from '../stores/uiStore.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const uiStore = useUiStore()
const { refresh } = useScrollReveal()

onMounted(() => {
  setTimeout(refresh, 800)
})
</script>

<style scoped>
@media (max-width: 767px) {
  main {
    padding-top: calc(5rem - 38px);
  }
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}
</style>
