export interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  tipoProduto: 'Eletrônico' | 'Eletrodoméstico' | 'Móvel';
  valorFornecedor: number;
  quantidadeEstoque: number;
}
