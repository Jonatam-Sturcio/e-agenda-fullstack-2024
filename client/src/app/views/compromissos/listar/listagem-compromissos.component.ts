import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ListarCompromissoViewModel } from '../models/compromisso.models';
@Component({
  selector: 'app-listagem-compromissos',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-compromissos.component.html',
})
export class ListagemCompromissoComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos'];
  }
}
