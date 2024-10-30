import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Routes } from '@angular/router';
import {
  ListarCategoriasViewModel,
  VisualizarCategoriaViewModel,
} from './models/categoria.models';
import { CategoriaService } from './services/categoria.service';
import { ListagemCategoriasComponent } from './listar/listagem-categorias.component';
import { CadastroCategoriaComponent } from './cadastrar/cadastro-categoria.component';
import { EdicaoCategoriaComponent } from './editar/edicao-categoria.component';
import { ExclusaoCategoriaComponent } from './excluir/exclusao-categoria.component';
import { ListagemCategoriasResolver } from './services/listagem-categorias.resolver';

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];
  return inject(CategoriaService).selecionarPorId(id);
};

export const CategoriasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCategoriasComponent,
    resolve: {
      categorias: ListagemCategoriasResolver,
    },
  },
  { path: 'cadastrar', component: CadastroCategoriaComponent },
  {
    path: 'editar/:id',
    component: EdicaoCategoriaComponent,
    resolve: {
      categoria: visualizarCategoriaResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoCategoriaComponent,
    resolve: {
      categoria: visualizarCategoriaResolver,
    },
  },
];
