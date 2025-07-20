<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#0B162C]">Produtos</h1>

    <button
      @click="openForm()"
      class="mb-4 bg-[#00C4FF] text-white px-4 py-2 rounded hover:bg-[#009ACC] transition"
    >
      + Novo Produto
    </button>

    <table class="min-w-full table-auto border border-gray-300 rounded">
      <thead class="bg-[#0B162C] text-white">
        <tr>
          <th class="border px-4 py-2">Código</th>
          <th class="border px-4 py-2">Descrição</th>
          <th class="border px-4 py-2">Tipo Produto</th>
          <th class="border px-4 py-2">Valor Fornecedor</th>
          <th class="border px-4 py-2">Qtd. Estoque</th>
          <th class="border px-4 py-2 w-36">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id" class="hover:bg-gray-100">
          <td class="border px-4 py-2">{{ produto.codigo }}</td>
          <td class="border px-4 py-2">{{ produto.descricao }}</td>
          <td class="border px-4 py-2">{{ produto.tipoProduto.nome }}</td>
          <td class="border px-4 py-2">R$ {{ produto.valorFornecedor.toFixed(2) }}</td>
          <td class="border px-4 py-2">{{ produto.quantidadeEstoque }}</td>
          <td class="border px-4 py-1 text-center">
            <div class="inline-flex items-center space-x-2">
              <button @click="openForm(produto)" class="text-yellow-500 hover:text-yellow-600">
                <Pencil class="w-5 h-5" />
              </button>
              <button @click="deleteProduto(produto.id)" class="text-red-500 hover:text-red-600">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="produtos.length === 0">
          <td colspan="6" class="text-center py-4 text-gray-500">Nenhum produto cadastrado.</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form Produto -->
    <ProdutoForm
      v-if="showForm"
      :produto="selectedProduto"
      @close="closeForm"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProdutoForm from '@/components/ProdutoForm.vue'
import api from '@/services/api'
import { Pencil, Trash2 } from 'lucide-vue-next'

const produtos = ref([])
const showForm = ref(false)
const selectedProduto = ref(null)

const fetchProdutos = async () => {
  try {
    const response = await api.get('/produtos')
    produtos.value = response.data
  } catch (error) {
    console.error('Erro ao carregar produtos ou nenhum produto cadastrado.')
  }
}

const openForm = (produto = null) => {
  selectedProduto.value = produto
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedProduto.value = null
}

const handleSaved = () => {
  closeForm()
  fetchProdutos()
}

const deleteProduto = async (id) => {
  if (confirm('Deseja realmente excluir este produto?')) {
    try {
      await api.delete(`/produtos/${id}`)
      fetchProdutos()
    } catch (error) {
      alert('Erro ao excluir produto.')
    }
  }
}

onMounted(fetchProdutos)
</script>
