<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-center"
    :style="`background-image: url('/src/assets/background.jpg')`"
  >
    <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-80">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        type="text"
        v-model="username"
        placeholder="Usuário"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Senha"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        :disabled="!isFormValid"
        @click="login"
        class="w-full py-2 rounded text-white font-bold transition duration-200"
        :class="isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'"
      >
        Entrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const isFormValid = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== ''
})

const login = () => {
  router.push('/dashboard')
}
</script>
