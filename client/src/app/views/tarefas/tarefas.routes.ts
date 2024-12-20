import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import {
  ListarTarefaViewModel,
  VisualizarTarefaViewModel,
} from './models/tarefa.models';
import { TarefaService } from './service/tarefas.service';
import { ListagemTarefasComponent } from './listar/listagem-tarefas.component';
import { CadastroTarefaComponent } from './cadastrar/cadastro-tarefa.component';
import { EdicaoTarefaComponent } from './editar/edicao-tarefa.component';
import { ExclusaoTarefaComponent } from './excluir/exclusao-tarefa.component';

export const listagemTarefasResolver: ResolveFn<
  ListarTarefaViewModel[]
> = () => {
  return inject(TarefaService).selecionarTodos();
};

export const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(TarefaService).selecionarPorId(id);
};

export const tarefasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemTarefasComponent,
    resolve: { tarefas: listagemTarefasResolver },
  },
  {
    path: 'cadastrar',
    component: CadastroTarefaComponent,
  },
  {
    path: 'editar/:id',
    component: EdicaoTarefaComponent,
    resolve: {
      tarefa: visualizarTarefaResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoTarefaComponent,
    resolve: {
      tarefa: visualizarTarefaResolver,
    },
  },
];
