<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Movimentações de Produtos</h1>
    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 border">Código</th>
          <th class="px-4 py-2 border">Descrição</th>
          <th class="px-4 py-2 border">Estoque</th>
          <th class="px-4 py-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td class="border px-4 py-2">{{ produto.codigo }}</td>
          <td class="border px-4 py-2">{{ produto.descricao }}</td>
          <td class="border px-4 py-2">{{ produto.quantidadeEstoque }}</td>
          <td class="border px-4 py-2 text-center">
            <button @click="abrirModal(produto)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Movimentar Produto
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <MovimentacaoModal
      v-if="modalAberto"
      :produto="produtoSelecionado"
      @fechar="modalAberto = false"
      @confirmar="movimentarProduto"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovimentacaoModal from '@/components/MovimentacoesModal.vue'
import axios from 'axios'

const produtos = ref([])
const modalAberto = ref(false)
const produtoSelecionado = ref(null)

const carregarProdutos = async () => {
  const response = await axios.get('http://localhost:8080/api/produtos')
  produtos.value = response.data
}

const abrirModal = (produto) => {
  produtoSelecionado.value = produto
  modalAberto.value = true
}

const movimentarProduto = async (payload) => {
  try {
    await axios.post(`http://localhost:8080/api/movimentacoes`, payload)
    await carregarProdutos()
    modalAberto.value = false
    alert('Movimentação realizada com sucesso!')
  } catch (e) {
    alert(e.response?.data?.mensagem || 'Erro ao movimentar produto')
  }
}

onMounted(() => {
  carregarProdutos()
})
</script>

<style scoped>
</style>
