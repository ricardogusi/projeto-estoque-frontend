<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Lista de Produtos</h1>

    <button
      @click="$router.push('/produtos/novo')"
      class="mb-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors"
    >
      Novo Produto
    </button>

    <table class="min-w-full border border-gray-300 rounded overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2 text-left">Código</th>
          <th class="border px-4 py-2 text-left">Descrição</th>
          <th class="border px-4 py-2 text-left">Tipo Produto</th>
          <th class="border px-4 py-2 text-right">Valor Fornecedor</th>
          <th class="border px-4 py-2 text-right">Qtd Estoque</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="produto in produtos"
          :key="produto.id"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="border px-4 py-2">
            <router-link
              :to="`/produtos/${produto.id}`"
              class="text-blue-600 hover:underline"
            >
              {{ produto.codigo }}
            </router-link>
          </td>
          <td class="border px-4 py-2">{{ produto.descricao }}</td>
          <td class="border px-4 py-2">{{ produto.tipoProduto }}</td>
          <td class="border px-4 py-2 text-right">
            R$ {{ produto.valorFornecedor.toFixed(2) }}
          </td>
          <td class="border px-4 py-2 text-right">{{ produto.quantidadeEstoque }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="mt-4 text-center text-gray-600">Carregando produtos...</div>
    <div v-if="error" class="mt-4 text-center text-red-600">
      Erro ao carregar produtos: {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Produto } from '../types/Produto';
import { listarProdutos } from '../services/produtoService';

const produtos = ref<Produto[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchProdutos() {
  loading.value = true;
  error.value = null;
  try {
    produtos.value = await listarProdutos();
  } catch (err) {
    error.value = (err as Error).message || 'Erro desconhecido';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProdutos();
});
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
