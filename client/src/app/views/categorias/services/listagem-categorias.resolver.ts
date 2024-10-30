import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ListarCategoriasViewModel } from '../models/categoria.models';
import { CategoriaService } from './categoria.service';

export const ListagemCategoriasResolver: ResolveFn<
  ListarCategoriasViewModel[]
> = () => {
  return inject(CategoriaService).selecionarTodos();
};
