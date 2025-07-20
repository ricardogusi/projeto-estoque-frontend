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
        {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
      </h2>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1" for="codigo">Código</label>
        <input
          id="codigo"
          type="text"
          v-model="form.codigo"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
          :disabled="isEdit"
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1" for="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          v-model="form.descricao"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1" for="tipoProduto">Tipo Produto</label>
        <select
          id="tipoProduto"
          v-model.number="form.tipoProdutoId"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option disabled value="">Selecione um tipo</option>
          <option value="1">Eletrônico</option>
          <option value="2">Eletrodoméstico</option>
          <option value="3">Móvel</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1" for="valorFornecedor">Valor no Fornecedor</label>
        <input
          id="valorFornecedor"
          type="number"
          min="0.01"
          step="0.01"
          v-model.number="form.valorFornecedor"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

        <div class="mb-6">
        <label class="block font-medium text-gray-700 mb-1" for="fornecedor">Fornecedor</label>
        <select
          id="fornecedor"
          v-model.number="form.fornecedorId"
          class="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option disabled value="">Selecione um tipo</option>
          <option value="1">Fornecedor 1</option>
          <option value="2">Fornecedor 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700 mb-1" for="quantidadeEstoque">Quantidade em Estoque</label>
        <input
          id="quantidadeEstoque"
          type="number"
          min="0"
          step="1"
          v-model.number="form.quantidadeEstoque"
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
          :disabled="!isValid"
          class="px-4 py-2 rounded bg-[#00C4FF] text-white font-semibold hover:bg-[#009ACC] disabled:opacity-50"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps({
  produto: { type: Object, default: null }
})
const emit = defineEmits(['close', 'saved'])

const isEdit = ref(!!props.produto)

const form = reactive({
  id: null,
  codigo: '',
  descricao: '',
  tipoProdutoId: '',
  fornecedorId: '',
  valorFornecedor: null,
  quantidadeEstoque: null,
})

if (props.produto) {
  Object.assign(form, props.produto)
}

const isValid = computed(() => {
  return (
    form.codigo.trim() !== '' &&
    form.descricao.trim() !== '' &&
    form.tipoProdutoId !== '' &&
    form.fornecedorId !== '' &&
    form.valorFornecedor > 0 &&
    form.quantidadeEstoque >= 0
  )
})

const close = () => emit('close')

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await api.put(`/produtos/${form.id}`, form)
    } else {
      await api.post('/produtos', form)
    }
    emit('saved')
  } catch (err) {
    console.error(err)
  }
}
</script>