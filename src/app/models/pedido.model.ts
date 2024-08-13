export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

export interface Pedido {
  id: number;
  produtos: Produto[];
  fechado: boolean;
}
