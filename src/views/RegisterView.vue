<template>
  <div class="min-h-screen bg-brand-black flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <RouterLink to="/" class="inline-flex items-center gap-3 justify-center mb-8">
          <div class="w-12 h-12 flex items-center justify-center rounded border border-brand-gold/30 bg-brand-gray/50">
            <span class="text-brand-white font-black text-base">B</span>
          </div>
          <div class="leading-none">
            <div class="text-brand-white font-black text-xl tracking-widest uppercase">B-FIT</div>
          </div>
        </RouterLink>
        <h1 class="text-brand-white font-black text-3xl">Create Account</h1>
        <p class="text-brand-silver/50 text-sm mt-2">Join the B-FIT community</p>
      </div>
      <div class="bg-brand-charcoal rounded border border-white/[0.07] p-8">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">First Name</label>
              <input v-model="form.firstName" type="text" class="input-premium" placeholder="John" required />
            </div>
            <div>
              <label class="text-brand-silver/70 text-sm mb-2 block">Last Name</label>
              <input v-model="form.lastName" type="text" class="input-premium" placeholder="Doe" required />
            </div>
          </div>
          <div>
            <label class="text-brand-silver/70 text-sm mb-2 block">Email</label>
            <input v-model="form.email" type="email" class="input-premium" placeholder="you@example.com" required />
          </div>
          <div>
            <label class="text-brand-silver/70 text-sm mb-2 block">Password</label>
            <input v-model="form.password" type="password" class="input-premium" placeholder="Min. 8 characters" minlength="8" required />
          </div>
          <button type="submit" :disabled="loading" class="btn-primary w-full justify-center">
            <Loader2 v-if="loading" :size="18" class="animate-spin" />
            <template v-else><UserPlus :size="18" /> Create Account</template>
          </button>
        </form>
        <div class="section-divider my-6"></div>
        <p class="text-center text-brand-silver/50 text-sm">
          Already have an account?
          <RouterLink to="/login" class="text-brand-red font-semibold hover:underline ml-1">Sign In</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const form = ref({ firstName: '', lastName: '', email: '', password: '' })

async function handleRegister() {
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  authStore.login({ name: `${form.value.firstName} ${form.value.lastName}`, email: form.value.email })
  loading.value = false
  router.push('/')
}
</script>
