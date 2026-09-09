<template>
  <div class="min-h-screen bg-brand-black">
    <TopBar />
    <Header />
    <MobileMenu />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <!-- Steps Header -->
      <div class="flex items-center justify-between mb-12">
        <h1 class="text-brand-white font-black text-2xl md:text-3xl">Checkout</h1>
        <div class="flex items-center gap-2">
          <div v-for="(step, i) in steps" :key="step.id" class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                :class="currentStep > step.id ? 'bg-green-500 text-white' : currentStep === step.id ? 'bg-brand-red text-white' : 'bg-brand-gray border border-white/15 text-brand-silver/50'"
              >
                <Check v-if="currentStep > step.id" :size="13" />
                <span v-else>{{ step.id }}</span>
              </div>
              <span class="hidden md:block text-xs font-medium transition-colors" :class="currentStep >= step.id ? 'text-brand-white' : 'text-brand-silver/40'">{{ step.label }}</span>
            </div>
            <div v-if="i < steps.length - 1" class="w-8 h-px bg-white/15 mx-1"></div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Left: Step Content -->
        <div class="lg:col-span-2">
          <!-- Step 1: Shipping -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-brand-white font-bold text-xl mb-6">Shipping Information</h2>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="text-brand-silver/70 text-sm mb-2 block">First Name *</label>
                <input v-model="form.firstName" type="text" class="input-premium" placeholder="John" />
              </div>
              <div>
                <label class="text-brand-silver/70 text-sm mb-2 block">Last Name *</label>
                <input v-model="form.lastName" type="text" class="input-premium" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Email *</label>
              <input v-model="form.email" type="email" class="input-premium" placeholder="john@example.com" />
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Phone *</label>
              <input v-model="form.phone" type="tel" class="input-premium" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Address *</label>
              <input v-model="form.address" type="text" class="input-premium" placeholder="Street address" />
            </div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="text-brand-silver/70 text-sm mb-2 block">City *</label>
                <input v-model="form.city" type="text" class="input-premium" placeholder="Mumbai" />
              </div>
              <div>
                <label class="text-brand-silver/70 text-sm mb-2 block">PIN Code *</label>
                <input v-model="form.pin" type="text" class="input-premium" placeholder="400001" maxlength="6" />
              </div>
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">State *</label>
              <input v-model="form.state" type="text" class="input-premium" placeholder="Maharashtra" />
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-brand-white font-bold text-xl mb-6">Payment Method</h2>
            <div class="space-y-3">
              <label v-for="method in paymentMethods" :key="method.id" class="flex items-center gap-4 p-4 rounded border cursor-pointer transition-all duration-300"
                :class="form.paymentMethod === method.id ? 'border-brand-red bg-brand-red/5' : 'border-white/10 hover:border-white/20'"
              >
                <input type="radio" :value="method.id" v-model="form.paymentMethod" class="sr-only" />
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  :class="form.paymentMethod === method.id ? 'border-brand-red' : 'border-white/30'"
                >
                  <div v-if="form.paymentMethod === method.id" class="w-2.5 h-2.5 rounded-full bg-brand-red"></div>
                </div>
                <component :is="method.icon" :size="20" class="text-brand-silver" />
                <div>
                  <p class="text-brand-white font-semibold text-sm">{{ method.label }}</p>
                  <p class="text-brand-silver/50 text-xs">{{ method.desc }}</p>
                </div>
              </label>
            </div>
            <!-- UPI Input -->
            <div v-if="form.paymentMethod === 'upi'" class="mt-4">
              <label class="text-brand-silver/70 text-sm mb-2 block">UPI ID</label>
              <input v-model="form.upiId" type="text" class="input-premium" placeholder="yourname@upi" />
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-if="currentStep === 3" class="space-y-5">
            <h2 class="text-brand-white font-bold text-xl mb-6">Order Review</h2>
            <!-- Cart summary in step 3 -->
            <div class="space-y-3">
              <div v-for="item in cartStore.items" :key="item.key" class="flex gap-4 p-4 bg-brand-charcoal rounded border border-white/[0.06]">
                <img :src="item.thumbnail" :alt="item.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
                <div class="flex-1">
                  <p class="text-brand-white font-semibold text-sm">{{ item.name }}</p>
                  <p class="text-brand-silver/50 text-xs mt-0.5">Qty: {{ item.quantity }}<span v-if="item.size"> · {{ item.size }}</span></p>
                </div>
                <p class="text-brand-white font-bold text-sm flex-shrink-0">Rs. {{ ((item.salePrice || item.price) * item.quantity).toLocaleString() }}</p>
              </div>
            </div>
            <!-- Shipping details -->
            <div class="p-5 bg-brand-charcoal rounded border border-white/[0.06] text-sm text-brand-silver/70">
              <p class="font-semibold text-brand-white mb-2">Shipping to</p>
              <p>{{ form.firstName }} {{ form.lastName }} · {{ form.phone }}</p>
              <p>{{ form.address }}, {{ form.city }}, {{ form.state }} {{ form.pin }}</p>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button v-if="currentStep > 1" @click="currentStep--" class="btn-ghost border border-white/15">
              <ChevronLeft :size="16" /> Back
            </button>
            <div v-else></div>
            <button
              @click="nextStep"
              :disabled="loading"
              class="btn-primary"
            >
              <Loader2 v-if="loading" :size="18" class="animate-spin" />
              <template v-else>
                {{ currentStep === 3 ? 'Place Order' : 'Continue' }}
                <ChevronRight :size="16" />
              </template>
            </button>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div>
          <div class="bg-brand-charcoal rounded border border-white/[0.06] p-6 sticky top-24">
            <h3 class="text-brand-white font-bold text-lg mb-5">Order Summary</h3>
            <div class="space-y-3 mb-5 max-h-64 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="item.key" class="flex gap-3">
                <img :src="item.thumbnail" :alt="item.name" class="w-12 h-12 object-cover rounded flex-shrink-0" loading="lazy" />
                <div class="flex-1 min-w-0">
                  <p class="text-brand-white text-sm font-medium line-clamp-1">{{ item.name }}</p>
                  <p class="text-brand-silver/50 text-xs">× {{ item.quantity }}</p>
                </div>
                <p class="text-brand-white text-sm font-bold flex-shrink-0">Rs. {{ ((item.salePrice || item.price) * item.quantity).toLocaleString() }}</p>
              </div>
            </div>
            <div class="border-t border-white/[0.06] pt-4 space-y-2 text-sm text-brand-silver/70">
              <div class="flex justify-between"><span>Subtotal</span><span>Rs. {{ cartStore.subtotal.toLocaleString() }}</span></div>
              <div class="flex justify-between"><span>Shipping</span><span :class="cartStore.subtotal >= 999 ? 'text-green-400' : ''">{{ cartStore.subtotal >= 999 ? 'Free' : 'Rs. 99' }}</span></div>
              <div class="flex justify-between text-brand-white font-bold text-base pt-2 border-t border-white/[0.06]">
                <span>Total</span><span>Rs. {{ total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Check, ChevronLeft, ChevronRight, Loader2, CreditCard, Smartphone, Banknote, Wallet } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import Footer from '../components/layout/Footer.vue'
import { useCartStore } from '../stores/cartStore.js'

const cartStore = useCartStore()
const router = useRouter()

const currentStep = ref(1)
const loading = ref(false)

const steps = [
  { id: 1, label: 'Shipping' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Review' },
]

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', pin: '',
  paymentMethod: 'cod', upiId: '',
})

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Banknote },
  { id: 'upi', label: 'UPI', desc: 'PhonePe, GPay, Paytm, etc.', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'wallet', label: 'Wallet', desc: 'Paytm, Amazon Pay, etc.', icon: Wallet },
]

const total = computed(() =>
  cartStore.subtotal >= 999 ? cartStore.subtotal : cartStore.subtotal + 99
)

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    placeOrder()
  }
}

async function placeOrder() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  cartStore.clearCart()
  loading.value = false
  router.push('/order-success')
}
</script>
