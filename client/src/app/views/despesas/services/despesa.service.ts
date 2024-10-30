import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
  InserirDespesaViewModel,
  DespesaInseridaViewModel,
  EditarDespesaViewModel,
  DespesaEditadaViewModel,
  DespesaExcluidaViewModel,
} from '../models/despesa.models';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  private readonly url = `${environment.apiUrl}/despesas`;

  constructor(private http: HttpClient) {}

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<ListarDespesaViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: any): Observable<VisualizarDespesaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarDespesaViewModel[]>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public inserir(
    inserirDespesaVm: InserirDespesaViewModel
  ): Observable<DespesaInseridaViewModel> {
    return this.http
      .post<DespesaInseridaViewModel>(this.url, inserirDespesaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarDespesaVm: EditarDespesaViewModel
  ): Observable<DespesaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .put<DespesaEditadaViewModel>(urlCompleto, editarDespesaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  excluir(id: string): Observable<DespesaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<DespesaExcluidaViewModel[]>(urlCompleto)
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
