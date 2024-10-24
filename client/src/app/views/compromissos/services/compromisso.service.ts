import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { ListarCompromissoViewModel } from '../models/compromisso.models';
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

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
