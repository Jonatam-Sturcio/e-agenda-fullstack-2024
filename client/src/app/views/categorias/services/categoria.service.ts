import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ListarCategoriasViewModel,
  VisualizarCategoriaViewModel,
  InserirCategoriaViewModel,
  CategoriaInseridoViewModel,
  EditarCategoriaViewModel,
  CategoriaEditadoViewModel,
  CategoriaExcluidaViewModel,
} from '../models/categoria.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  public selecionarTodos(): Observable<ListarCategoriasViewModel[]> {
    return this.http
      .get<ListarCategoriasViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: any): Observable<VisualizarCategoriaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarCategoriaViewModel[]>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public inserir(
    inserirCategoriaVm: InserirCategoriaViewModel
  ): Observable<CategoriaInseridoViewModel> {
    return this.http
      .post<CategoriaInseridoViewModel>(this.url, inserirCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarCategoriaVm: EditarCategoriaViewModel
  ): Observable<CategoriaEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .put<CategoriaEditadoViewModel>(urlCompleto, editarCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  excluir(id: string): Observable<CategoriaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<CategoriaExcluidaViewModel[]>(urlCompleto)
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
