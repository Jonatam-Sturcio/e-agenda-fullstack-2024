import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import {
  CompromissoEditadoViewModel,
  CompromissoInseridoViewModel,
  EditarCompromissoViewModel,
  InserirCompromissoViewModel,
  ListarCompromissoViewModel,
  VisualizarCompromissoViewModel,
} from '../models/compromisso.models';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<ListarCompromissoViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: any): Observable<VisualizarCompromissoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarCompromissoViewModel[]>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public inserir(
    inserirCompromissoVm: InserirCompromissoViewModel
  ): Observable<CompromissoInseridoViewModel> {
    return this.http
      .post<CompromissoInseridoViewModel>(this.url, inserirCompromissoVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarCompromissoVm: EditarCompromissoViewModel
  ): Observable<CompromissoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .put<CompromissoEditadoViewModel>(urlCompleto, editarCompromissoVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
