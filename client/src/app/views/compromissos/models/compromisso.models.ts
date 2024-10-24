import { ListarContatoViewModel } from '../../contatos/models/contato.models';

export interface InserirCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
}
export interface CompromissoInseridoViewModel {
  id: number;
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
}
export interface EditarCompromissoViewModel {
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
}
export interface CompromissoEditadoViewModel {
  id: number;
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
}
export interface CompromissoExcluidoViewModel {}
export interface ListarCompromissoViewModel {
  id: number;
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
  Contato?: ListarContatoViewModel;
}
export interface VisualizarCompromissoViewModel {
  id: number;
  assunto: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  local?: string;
  link?: string;
  idContato?: number;
  Contato?: ListarContatoViewModel;
}
