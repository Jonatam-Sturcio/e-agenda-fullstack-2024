import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../services/contato.service';
import {
  ContatoInseridoViewModel,
  InserirContatoViewModel,
} from '../models/contato.models';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-cadastro-contato',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-contato.component.html',
})
export class CadastroContatoComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private nofitificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      empresa: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      cargo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  get nome() {
    return this.form.get('nome');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get email() {
    return this.form.get('email');
  }

  get empresa() {
    return this.form.get('empresa');
  }

  get cargo() {
    return this.form.get('cargo');
  }
  public gravar() {
    if (this.form.invalid) {
      this.nofitificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );
      return;
    }
    const inserirContato: InserirContatoViewModel = this.form.value;

    const observer: PartialObserver<ContatoInseridoViewModel> = {
      next: (contatoInserido) => this.processarSucesso(contatoInserido),
      error: (erro) => this.processarFalha(erro),
    };

    this.contatoService.inserir(inserirContato).subscribe({});
  }

  private processarSucesso(contato: ContatoInseridoViewModel): void {
    this.nofitificacaoService.sucesso(
      `Contato "${contato.nome}" cadastrado com sucesso!`
    );
    this.router.navigate(['/contatos', 'listar']);
  }
  private processarFalha(erro: Error) {
    this.nofitificacaoService.erro(erro.message);
  }
}
