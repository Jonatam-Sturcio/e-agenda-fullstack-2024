import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ListagemCompromissoComponent } from './listar/listagem-compromissos.component';
import {
  ListarCompromissoViewModel,
  VisualizarCompromissoViewModel,
} from './models/compromisso.models';
import { CompromissoService } from './services/compromisso.service';
import { CadastroCompromissoComponent } from './cadastrar/cadastro-compromisso.component';
import { EdicaoCompromissoComponent } from './editar/edicao-compromisso.component';

const listagemCompromissosResolver: ResolveFn<
  ListarCompromissoViewModel[]
> = () => {
  return inject(CompromissoService).selecionarTodos();
};
const visualizarCompromissoResolver: ResolveFn<
  VisualizarCompromissoViewModel
> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(CompromissoService).selecionarPorId(id);
};

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCompromissoComponent,
    resolve: {
      compromissos: listagemCompromissosResolver,
    },
  },
  { path: 'cadastrar', component: CadastroCompromissoComponent },
  {
    path: 'editar/:id',
    component: EdicaoCompromissoComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver,
    },
  },
];
