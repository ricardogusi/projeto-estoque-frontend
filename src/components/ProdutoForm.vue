<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow rounded">
    <h2 class="text-xl font-semibold mb-4">{{ isEditando ? 'Editar Produto' : 'Novo Produto' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="codigo" class="block font-medium mb-1">Código</label>
        <input
          id="codigo"
          v-model="form.codigo"
          type="text"
          class="w-full border rounded px-3 py-2"
          :disabled="isEditando"
          required
        />
      </div>

      <div class="mb-3">
        <label for="descricao" class="block font-medium mb-1">Descrição</label>
        <input
          id="descricao"
          v-model="form.descricao"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div class="mb-3">
        <label for="tipoProduto" class="block font-medium mb-1">Tipo Produto</label>
        <select
          id="tipoProduto"
          v-model="form.tipoProduto"
          class="w-full border rounded px-3 py-2"
          required
        >
          <option value="" disabled>Selecione</option>
          <option value="Eletrônico">Eletrônico</option>
          <option value="Eletrodoméstico">Eletrodoméstico</option>
          <option value="Móvel">Móvel</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="valorFornecedor" class="block font-medium mb-1">Valor no Fornecedor (R$)</label>
        <input
          id="valorFornecedor"
          v-model.number="form.valorFornecedor"
          type="number"
          min="0"
          step="0.01"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div class="mb-3">
        <label for="quantidadeEstoque" class="block font-medium mb-1">Quantidade em Estoque</label>
        <input
          id="quantidadeEstoque"
          v-model.number="form.quantidadeEstoque"
          type="number"
          min="0"
          class="w-full border rounded px-3 py-2"
          required
          :disabled="isEditando"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          :disabled="loading"
        >
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
        <button type="button" class="px-4 py-2 rounded border" @click="cancelar">Cancelar</button>
      </div>
    </form>

    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    <div v-if="sucesso" class="mt-4 text-green-600">Produto salvo com sucesso!</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Produto } from '../types/Produto';
import { criarProduto, buscarProdutoPorId, editarProduto } from '../services/produtoService';

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref<string | null>(null);
const sucesso = ref(false);

const isEditando = ref(false);
const form = reactive<Produto>({
  id: 0,
  codigo: '',
  descricao: '',
  tipoProduto: '',
  valorFornecedor: 0,
  quantidadeEstoque: 0,
});

async function carregarProduto(id: number) {
  loading.value = true;
  error.value = null;
  try {
    const p = await buscarProdutoPorId(id);
    Object.assign(form, p);
  } catch (err) {
    error.value = (err as Error).message || 'Erro ao carregar produto';
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  loading.value = true;
  error.value = null;
  sucesso.value = false;

  try {
    if (isEditando.value) {
      await editarProduto(form);
    } else {
      await criarProduto(form);
    }
    sucesso.value = true;
    setTimeout(() => {
      sucesso.value = false;
      router.push('/produtos');
    }, 1500);
  } catch (err) {
    error.value = (err as Error).message || 'Erro ao salvar produto';
  } finally {
    loading.value = false;
  }
}

function cancelar() {
  router.push('/produtos');
}

onMounted(() => {
  const idParam = route.params.id;
  if (idParam) {
    isEditando.value = true;
    const id = Number(idParam);
    carregarProduto(id);
  }
});
</script>

<style scoped>
/* Aqui você pode colocar seus estilos customizados ou usar Tailwind, etc */
</style>
