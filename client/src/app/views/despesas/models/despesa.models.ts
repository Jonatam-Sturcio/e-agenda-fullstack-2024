export enum FormaPgtoDespesaEnum {
  PIX,
  Dinheiro,
  CartaoCredito = 'Cartão de Crédito',
}

import { ListarContatoViewModel } from '../../contatos/models/contato.models';

export interface InserirDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}
export interface DespesaInseridoViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}
export interface EditarDespesaViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}
export interface DespesaEditadoViewModel {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}
export interface DespesaExcluidoViewModel {}
export interface ListarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: string;
}
export interface VisualizarDespesaViewModel {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPgtoDespesaEnum;
  categoriasSelecionadas: string[];
}
