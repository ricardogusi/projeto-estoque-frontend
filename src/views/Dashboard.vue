<!-- src/views/DashboardLucro.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Relatório de Lucro por Produto</h1>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 border">Código</th>
          <th class="px-4 py-2 border">Descrição</th>
          <th class="px-4 py-2 border">Saídas</th>
          <th class="px-4 py-2 border">Lucro Total (R$)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lucroPorProduto" :key="item.id">
          <td class="border px-4 py-2">{{ item.codigo }}</td>
          <td class="border px-4 py-2">{{ item.descricao }}</td>
          <td class="border px-4 py-2 text-center">{{ item.quantidadeSaida }}</td>
          <td class="border px-4 py-2 text-right">
            {{ item.lucroTotal.toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const lucroPorProduto = ref([])

const carregarLucro = async () => {
  const response = await axios.get('http://localhost:8080/api/dashboard/lucro')
  lucroPorProduto.value = response.data
}

onMounted(() => {
  carregarLucro()
})
</script>
