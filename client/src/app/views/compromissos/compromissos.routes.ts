import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ListagemCompromissosComponent } from './listar/listagem-compromissos.component';
import { ListarCompromissoViewModel } from './models/compromisso.models';
import { CompromissoService } from './services/compromisso.service';

const listagemContatosResolver: ResolveFn<
  ListarCompromissoViewModel[]
> = () => {
  return inject(CompromissoService).selecionarTodos();
};

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemCompromissosComponent,
    resolve: {
      contatos: listagemContatosResolver,
    },
  },
];
