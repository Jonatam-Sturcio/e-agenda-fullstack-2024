import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ListagemCompromissoComponent } from './listar/listagem-compromissos.component';
import { ListarCompromissoViewModel } from './models/compromisso.models';
import { CompromissoService } from './services/compromisso.service';
import { CadastroCompromissoComponent } from './cadastrar/cadastro-compromisso.component';

const listagemCompromissosResolver: ResolveFn<
  ListarCompromissoViewModel[]
> = () => {
  return inject(CompromissoService).selecionarTodos();
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
];
