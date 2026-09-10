<template>
  <div class="min-h-screen bg-brand-bg">
    <TopBar />
    <Header />
    <MobileMenu />
    <div class="h-16 md:h-25"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <!-- Steps Header -->
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <h1 class="text-brand-text font-black text-2xl md:text-3xl">Checkout</h1>
          <p class="text-brand-muted text-xs sm:text-sm mt-0.5">Complete your order details below</p>
        </div>
        <div class="flex items-center gap-2">
          <div v-for="(step, i) in steps" :key="step.id" class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                :class="currentStep > step.id ? 'bg-green-600 text-white' : currentStep === step.id ? 'bg-brand-red text-white' : 'bg-brand-surface border border-brand-border text-brand-muted'"
              >
                <Check v-if="currentStep > step.id" :size="13" />
                <span v-else>{{ step.id }}</span>
              </div>
              <span class="hidden md:block text-xs font-bold transition-colors" :class="currentStep >= step.id ? 'text-brand-text' : 'text-brand-muted'">{{ step.label }}</span>
            </div>
            <div v-if="i < steps.length - 1" class="w-6 sm:w-8 h-px bg-brand-border mx-1"></div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Left: Step Content Form -->
        <div class="lg:col-span-2">
          <!-- Step 1: Customer & Shipping Details -->
          <div v-if="currentStep === 1" class="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-sm space-y-5">
            <h2 class="text-brand-text font-bold text-lg border-b border-brand-border pb-3">1. Customer Information</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">First Name *</label>
                <input v-model="form.firstName" type="text" class="input-premium w-full" placeholder="Aman" required />
              </div>
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">Last Name *</label>
                <input v-model="form.lastName" type="text" class="input-premium w-full" placeholder="Sharma" required />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">Email Address *</label>
                <input v-model="form.email" type="email" class="input-premium w-full" placeholder="aman@example.com" required />
              </div>
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">Phone Number *</label>
                <input v-model="form.phone" type="tel" class="input-premium w-full" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <h2 class="text-brand-text font-bold text-lg border-b border-brand-border pt-4 pb-3">2. Shipping Address</h2>
            <div>
              <label class="text-brand-body text-xs font-bold mb-1.5 block">Street Address *</label>
              <input v-model="form.address" type="text" class="input-premium w-full" placeholder="Flat / House No., Landmark, Area" required />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">City *</label>
                <input v-model="form.city" type="text" class="input-premium w-full" placeholder="Mumbai" required />
              </div>
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">State *</label>
                <input v-model="form.state" type="text" class="input-premium w-full" placeholder="Maharashtra" required />
              </div>
              <div>
                <label class="text-brand-body text-xs font-bold mb-1.5 block">Pincode *</label>
                <input v-model="form.pin" type="text" class="input-premium w-full" placeholder="400001" maxlength="6" required />
              </div>
            </div>
          </div>

          <!-- Step 2: Payment Method (Frontend Demo) -->
          <div v-if="currentStep === 2" class="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-sm space-y-5">
            <div>
              <h2 class="text-brand-text font-bold text-lg">Payment Option</h2>
              <p class="text-brand-muted text-xs mt-1">Select your preferred payment method (Demo Mode — no actual payment processed)</p>
            </div>
            <div class="space-y-3">
              <label v-for="method in paymentMethods" :key="method.id" class="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200"
                :class="form.paymentMethod === method.id ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red' : 'border-brand-border hover:border-brand-text bg-white'"
              >
                <input type="radio" :value="method.id" v-model="form.paymentMethod" class="sr-only" />
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  :class="form.paymentMethod === method.id ? 'border-brand-red' : 'border-brand-border-2'"
                >
                  <div v-if="form.paymentMethod === method.id" class="w-2.5 h-2.5 rounded-full bg-brand-red"></div>
                </div>
                <component :is="method.icon" :size="20" class="text-brand-muted" />
                <div>
                  <p class="text-brand-text font-bold text-sm">{{ method.label }}</p>
                  <p class="text-brand-muted text-xs">{{ method.desc }}</p>
                </div>
              </label>
            </div>
            <!-- UPI Input -->
            <div v-if="form.paymentMethod === 'upi'" class="mt-4 p-4 bg-brand-surface rounded-xl border border-brand-border">
              <label class="text-brand-body text-xs font-bold mb-1.5 block">UPI Virtual Payment Address (VPA)</label>
              <input v-model="form.upiId" type="text" class="input-premium w-full" placeholder="username@okhdfcbank" />
            </div>
          </div>

          <!-- Step 3: Order Review -->
          <div v-if="currentStep === 3" class="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border shadow-sm space-y-5">
            <h2 class="text-brand-text font-bold text-lg border-b border-brand-border pb-3">Review & Confirm Order</h2>
            <!-- Items listing -->
            <div class="space-y-3">
              <div v-for="item in cartStore.items" :key="item.key" class="flex items-center gap-4 p-3.5 bg-brand-surface rounded-xl border border-brand-border">
                <img :src="item.thumbnail" :alt="item.name" class="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-white" loading="lazy" />
                <div class="flex-1 min-w-0">
                  <p class="text-brand-text font-bold text-sm line-clamp-1">{{ item.name }}</p>
                  <p class="text-brand-muted text-xs mt-0.5">
                    Qty: <span class="font-bold text-brand-text">{{ item.quantity }}</span>
                    <span v-if="item.size"> · Size: <span class="font-bold text-brand-text">{{ item.size }}</span></span>
                    <span v-if="item.color"> · Color: {{ item.color }}</span>
                  </p>
                </div>
                <p class="text-brand-text font-black text-sm flex-shrink-0">Rs. {{ ((item.price || item.salePrice) * item.quantity).toLocaleString() }}</p>
              </div>
            </div>
            <!-- Delivery destination -->
            <div class="p-4 bg-brand-surface rounded-xl border border-brand-border text-xs sm:text-sm text-brand-body space-y-1">
              <p class="font-bold text-brand-text">Shipping Destination:</p>
              <p>{{ form.firstName }} {{ form.lastName }} · {{ form.phone }}</p>
              <p>{{ form.address }}, {{ form.city }}, {{ form.state }} - {{ form.pin }}</p>
              <p class="text-brand-muted text-xs mt-1">Payment: <strong class="text-brand-text uppercase">{{ form.paymentMethod }}</strong></p>
            </div>
          </div>

          <!-- Navigation Step Buttons -->
          <div class="flex justify-between items-center mt-6">
            <button v-if="currentStep > 1" @click="currentStep--" class="btn-secondary text-xs px-5">
              <ChevronLeft :size="15" /> Back
            </button>
            <div v-else></div>

            <button
              @click="handleStepAction"
              :disabled="loading"
              class="btn-primary px-7 py-3 text-xs tracking-widest font-bold uppercase"
            >
              <Loader2 v-if="loading" :size="16" class="animate-spin" />
              <template v-else>
                {{ currentStep === 3 ? 'Place Order' : 'Continue' }}
                <ChevronRight :size="15" />
              </template>
            </button>
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div>
          <div class="bg-white rounded-2xl border border-brand-border p-6 sticky top-24 shadow-sm">
            <h3 class="text-brand-text font-black text-lg mb-4 pb-3 border-b border-brand-border">Order Summary</h3>

            <!-- Item list summary -->
            <div class="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
              <div v-for="item in cartStore.items" :key="item.key" class="flex items-center gap-3">
                <img :src="item.thumbnail" :alt="item.name" class="w-12 h-12 object-cover rounded-lg flex-shrink-0 bg-brand-surface" loading="lazy" />
                <div class="flex-1 min-w-0">
                  <p class="text-brand-text text-xs font-bold line-clamp-1">{{ item.name }}</p>
                  <p class="text-brand-muted text-[11px]">
                    Qty: {{ item.quantity }}
                    <span v-if="item.size">· {{ item.size }}</span>
                  </p>
                </div>
                <p class="text-brand-text text-xs font-bold flex-shrink-0">Rs. {{ ((item.price || item.salePrice) * item.quantity).toLocaleString() }}</p>
              </div>
            </div>

            <!-- Totals -->
            <div class="border-t border-brand-border pt-4 space-y-2 text-xs sm:text-sm text-brand-body">
              <div class="flex justify-between">
                <span>Original Subtotal</span>
                <span>Rs. {{ cartStore.originalSubtotal.toLocaleString() }}</span>
              </div>
              <div v-if="cartStore.totalDiscount > 0" class="flex justify-between text-green-600 font-semibold">
                <span>Savings</span>
                <span>-Rs. {{ cartStore.totalDiscount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {{ cartStore.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span :class="cartStore.shipping === 0 ? 'text-green-600 font-bold' : ''">
                  {{ cartStore.shipping === 0 ? 'FREE' : 'Rs. 99' }}
                </span>
              </div>
              <div class="flex justify-between text-brand-text font-black text-base pt-3 border-t border-brand-border">
                <span>Total Amount</span>
                <span>Rs. {{ cartStore.total.toLocaleString() }}</span>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, ChevronLeft, ChevronRight, Loader2, CreditCard, Smartphone, Banknote, Wallet } from 'lucide-vue-next'
import TopBar from '../components/layout/TopBar.vue'
import Header from '../components/layout/Header.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import Footer from '../components/layout/Footer.vue'
import { useCartStore } from '../stores/cartStore.js'
import { useUiStore } from '../stores/uiStore.js'

const cartStore = useCartStore()
const uiStore = useUiStore()
const router = useRouter()

const currentStep = ref(1)
const loading = ref(false)

const steps = [
  { id: 1, label: 'Address' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Review' },
]

const form = ref({
  firstName: 'Aman',
  lastName: 'Sharma',
  email: 'aman.sharma@example.com',
  phone: '+91 98765 43210',
  address: '402, Gymkhana Heights, Bandra West',
  city: 'Mumbai',
  state: 'Maharashtra',
  pin: '400050',
  paymentMethod: 'cod',
  upiId: '',
})

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay with cash upon receipt at your doorstep', icon: Banknote },
  { id: 'upi', label: 'Instant UPI Transfer', desc: 'Google Pay, PhonePe, Paytm, BHIM UPI', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'wallet', label: 'Mobile Wallets', desc: 'Amazon Pay, Paytm Wallet', icon: Wallet },
]

function handleStepAction() {
  if (currentStep.value === 1) {
    if (!form.value.firstName || !form.value.address || !form.value.city || !form.value.pin) {
      uiStore.showNotification('Please fill in all required shipping fields', 'error')
      return
    }
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    currentStep.value = 3
  } else {
    placeOrder()
  }
}

async function placeOrder() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  cartStore.clearCart()
  loading.value = false
  router.push('/order-success')
}
</script>
