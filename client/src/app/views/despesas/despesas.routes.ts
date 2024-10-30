import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Routes } from '@angular/router';
import {
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
} from './models/despesa.models';
import { DespesaService } from './services/despesa.service';
import { ListagemDespesasComponent } from './listar/listagem-despesas.component';
import { CadastroDespesaComponent } from './cadastrar/cadastro-despesa.component';
import { ListagemCategoriasResolver } from '../categorias/services/listagem-categorias.resolver';
import { EdicaoDespesaComponent } from './editar/edicao-despesa.component';
import { visualizarDespesaResolver } from './services/visualizar-despesa.resolver';
import { ExclusaoDespesaComponent } from './excluir/exclusao-despesa.component';

const listagemDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
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
      categorias: ListagemCategoriasResolver,
    },
  },
  {
    path: 'editar/:id',
    component: EdicaoDespesaComponent,
    resolve: {
      despesa: visualizarDespesaResolver,
      categorias: ListagemCategoriasResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoDespesaComponent,
    resolve: {
      despesa: visualizarDespesaResolver,
    },
  },
];
