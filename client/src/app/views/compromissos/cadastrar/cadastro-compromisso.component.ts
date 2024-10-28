import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Observable, PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoInseridoViewModel } from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { tipoCompromisso } from '../models/tipoComprmisso.model';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';
import { ContatoService } from '../../contatos/services/contato.service';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cadastro-compromisso',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './cadastro-compromisso.component.html',
})
export class CadastroCompromissoComponent implements OnInit {
  public form: FormGroup;
  public tipoCompromisso: tipoCompromisso[];
  public contatos$?: Observable<ListarContatoViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService,
    private contatoService: ContatoService
  ) {
    this.tipoCompromisso = [
      {
        id: 0,
        titulo: 'Remoto',
      },
      {
        id: 1,
        titulo: 'Presencial',
      },
    ];

    this.form = this.fb.group({
      assunto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      tipoLocal: ['', [Validators.required]],
      local: [''],
      link: [''],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      horaInicio: ['08:00', [Validators.required]],
      horaTermino: ['22:00', [Validators.required]],
      contatoId: [],
    });
  }
  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
  }

  get assunto() {
    return this.form.get('assunto');
  }

  get tipoLocal() {
    return this.form.get('tipoLocal');
  }

  get local() {
    return this.form.get('local');
  }

  get link() {
    return this.form.get('link');
  }

  get data() {
    return this.form.get('data');
  }
  get horaInicio() {
    return this.form.get('horaInicio');
  }

  get horaTermino() {
    return this.form.get('horaTermino');
  }

  get contatoId() {
    return this.form.get('contatoId');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const inserirCompromissoVm = this.form.value;

    const observer: PartialObserver<CompromissoInseridoViewModel> = {
      next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
      error: (erro) => this.processarFalha(erro),
    };
    this.compromissoService.inserir(inserirCompromissoVm).subscribe(observer);
  }

  private processarSucesso(compromisso: CompromissoInseridoViewModel): void {
    this.notificacaoService.sucesso(
      `Compromisso ${compromisso.assunto} cadastrado com sucesso!`
    );

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }

  tipoSelecionado(op: number): boolean {
    const controle = this.form.get('tipoLocal');

    if (!controle) return false;

    if (controle.dirty && controle.value == op) return true;

    return false;
  }
}
