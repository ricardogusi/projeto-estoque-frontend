<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="close"
  >
    <form
      @submit.prevent="submitForm"
      class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
    >
      <h2 class="text-2xl font-semibold mb-4 text-[#0B162C]">
        Movimentar Produto
      </h2>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1">Produto</label>
        <div class="border border-gray-300 rounded px-3 py-2 bg-gray-100">
          {{ produto.descricao }} (Código: {{ produto.codigo }})
        </div>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1">Tipo de Movimentação</label>
        <select
          v-model="form.tipo"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option disabled value="">Selecione</option>
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saída</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1">Quantidade</label>
        <input
          type="number"
          min="1"
          step="1"
          v-model.number="form.quantidade"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div class="mb-4" v-if="form.tipo === 'SAIDA'">
        <label class="block font-medium text-gray-700 mb-1">Valor da Venda</label>
        <input
          type="number"
          min="0"
          step="0.01"
          v-model.number="form.valorVenda"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="close"
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded bg-[#00C4FF] text-white font-semibold hover:bg-[#009ACC]"
        >
          Confirmar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  produto: { type: Object, required: true }
})
const emit = defineEmits(['fechar', 'confirmar'])

const form = reactive({
  tipo: '',
  quantidade: null,
  valorVenda: null
})

watch(() => form.tipo, tipo => {
  if (tipo !== 'SAIDA') form.valorVenda = null
})

const close = () => {
  emit('fechar')
}

const submitForm = async () => {
  try {
    const payload = {
      produto: { id: props.produto.id },
      tipo: form.tipo,
      quantidade: form.quantidade,
      valorVenda: form.tipo === 'SAIDA' ? form.valorVenda : null
    }
    emit('confirmar', payload)
    emit('fechar')
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Erro ao movimentar produto')
  }
}
</script>
