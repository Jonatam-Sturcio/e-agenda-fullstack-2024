import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { VisualizarContatoViewModel } from '../../contatos/models/contato.models';
import { ContatoService } from '../../contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { VisualizarCompromissoViewModel } from '../models/compromisso.models';

@Component({
  selector: 'app-exclusao-compromisso',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './exclusao-compromisso.component.html',
})
export class ExclusaoCompromissoComponent implements OnInit {
  detalhesCompromisso?: VisualizarCompromissoViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhesCompromisso = this.route.snapshot.data['compromisso'];
  }

  public excluir() {
    this.compromissoService.excluir(this.detalhesCompromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Compromisso excluído com sucesso!');

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
