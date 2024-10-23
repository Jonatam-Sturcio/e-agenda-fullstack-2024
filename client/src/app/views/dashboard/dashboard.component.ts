import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ItemRedirectDashboard } from './models/item-redirect-dashboard.model';
import { NgForOf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  itensRedirect: ItemRedirectDashboard[] = [
    {
      rota: '/contatos',
      texto: 'Contatos',
      icone: 'people',
      cypressTag: 'contatos',
    },
    {
      rota: '/compromissos',
      texto: 'Compromissos',
      icone: 'event',
      cypressTag: 'compromissos',
    },
    {
      rota: '/categorias',
      texto: 'Categorias',
      icone: 'bookmarks',
      cypressTag: 'categorias',
    },
    {
      rota: '/despesas',
      texto: 'Despesas',
      icone: 'currency_exchange',
      cypressTag: 'despesas',
    },
    {
      rota: '/tarefas',
      texto: 'Tarefas',
      icone: 'task_alt',
      cypressTag: 'tarefas',
    },
  ];
}
