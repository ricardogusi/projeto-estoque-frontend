import api from './api';
import type { Produto } from '../types/Produto';

export async function listarProdutos(): Promise<Produto[]> {
  const response = await api.get<Produto[]>('/produtos');
  return response.data;
}

export async function buscarProdutoPorId(id: number): Promise<Produto> {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
}

export async function criarProduto(produto: Produto): Promise<Produto> {
  const response = await api.post<Produto>('/produtos', produto);
  return response.data;
}

export async function editarProduto(produto: Produto): Promise<Produto> {
  const response = await api.put<Produto>(`/produtos/${produto.id}`, produto);
  return response.data;
}

export async function deletarProduto(id: number): Promise<void> {
  await api.delete(`/produtos/${id}`);
}
