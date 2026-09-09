<template>
  <div class="min-h-screen bg-brand-black flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-10">
        <RouterLink to="/" class="inline-flex items-center gap-3 justify-center mb-8">
          <div class="w-12 h-12 flex items-center justify-center rounded border border-brand-gold/30 bg-brand-gray/50">
            <span class="text-brand-white font-black text-base">B</span>
          </div>
          <div class="leading-none">
            <div class="text-brand-white font-black text-xl tracking-widest uppercase">B-FIT</div>
            <div class="text-brand-silver/40 text-[9px] tracking-[0.25em] uppercase">Sports & Supplements</div>
          </div>
        </RouterLink>
        <h1 class="text-brand-white font-black text-3xl">Welcome Back</h1>
        <p class="text-brand-silver/50 text-sm mt-2">Sign in to your B-FIT account</p>
      </div>

      <!-- Card -->
      <div class="bg-brand-charcoal rounded border border-white/[0.07] p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="text-brand-silver/70 text-sm mb-2 block">Email</label>
            <input v-model="form.email" type="email" class="input-premium" placeholder="you@example.com" required />
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <label class="text-brand-silver/70 text-sm">Password</label>
              <a href="#" class="text-brand-red text-xs hover:underline">Forgot password?</a>
            </div>
            <input v-model="form.password" :type="showPw ? 'text' : 'password'" class="input-premium" placeholder="••••••••" required />
          </div>

          <p v-if="error" class="text-brand-red text-sm">{{ error }}</p>

          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center">
            <Loader2 v-if="loading" :size="18" class="animate-spin" />
            <template v-else><LogIn :size="18" /> Sign In</template>
          </button>
        </form>

        <div class="section-divider my-6"></div>

        <p class="text-center text-brand-silver/50 text-sm">
          Don't have an account?
          <RouterLink to="/register" class="text-brand-red font-semibold hover:underline ml-1">Create Account</RouterLink>
        </p>
      </div>

      <RouterLink to="/" class="flex items-center justify-center gap-2 text-brand-silver/40 hover:text-brand-silver text-xs mt-6 transition-colors">
        <ArrowLeft :size="13" /> Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn, Loader2, ArrowLeft } from 'lucide-vue-next'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const showPw = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 800))
  authStore.login({ name: form.value.email.split('@')[0], email: form.value.email })
  loading.value = false
  router.push('/')
}
</script>
