import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Routes } from '@angular/router';
import {
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
} from './models/despesa.models';
import { DespesaService } from './services/despesa.service';
import { ListagemDespesasComponent } from './listar/listagem-despesas.component';
import { CadastroDespesaComponent } from './cadastrar/cadastro-despesa.component';
import { listagemCategoriasResolver } from '../categorias/services/listagem-categorias.resolver';

const listagemDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
};
const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];
  return inject(DespesaService).selecionarPorId(id);
};

export const DespesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemDespesasComponent,
    resolve: {
      despesas: listagemDespesasResolver,
    },
  },
  {
    path: 'cadastrar',
    component: CadastroDespesaComponent,
    resolve: {
      categorias: listagemCategoriasResolver,
    },
  },
  // {
  //   path: 'editar/:id',
  //   component: EdicaoDespesaComponent,
  //   resolve: {
  //     despesa: visualizarDespesaResolver,
  //     categorias: ListagemCategoriasResolver
  //   },
  // },
  // {
  //   path: 'excluir/:id',
  //   component: ExclusaoDespesaComponent,
  //   resolve: {
  //     despesa: visualizarDespesaResolver,
  //   },
  // },
];
