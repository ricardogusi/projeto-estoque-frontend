<template>
  <header class="bg-[#0B162C] fixed top-0 left-0 w-full z-50 shadow-md">
    <div class="flex items-center justify-between h-16 max-w-full px-4">
      <img src="@/assets/nexdomlogo.jpg" alt="Nexdom Logo" class="h-10 w-auto" />
      <nav class="flex space-x-8">
        <RouterLink
          to="/produtos"
          class="text-white hover:text-[#00C4FF] font-medium"
        >
          Produtos
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="text-white hover:text-[#00C4FF] font-medium"
        >
          Dashboard
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>

header {
  min-width: 100vw;
}

</style>
