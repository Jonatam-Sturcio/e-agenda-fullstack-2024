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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  ContatoEditadoViewModel,
  ListarContatoViewModel,
} from '../../contatos/models/contato.models';
import { ContatoService } from '../../contatos/services/contato.service';
import { tipoCompromisso } from '../models/tipoComprmisso.model';
import { CompromissoEditadoViewModel } from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edicao-compromisso',
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
  templateUrl: './edicao-compromisso.component.html',
})
export class EdicaoCompromissoComponent implements OnInit {
  public form: FormGroup;
  public tipoCompromisso: tipoCompromisso[];
  public contatos$?: Observable<ListarContatoViewModel[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService
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
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: [],
    });
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();

    const compromisso = this.route.snapshot.data['compromisso'];

    this.form.patchValue({ ...compromisso, contatoId: compromisso.contato.id });
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
    const id = this.route.snapshot.params['id'];
    const editarCompromissoVm = this.form.value;

    const observer: PartialObserver<CompromissoEditadoViewModel> = {
      next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
      error: (erro) => this.processarFalha(erro),
    };

    this.compromissoService.editar(id, editarCompromissoVm).subscribe(observer);
  }

  private processarSucesso(compromisso: CompromissoEditadoViewModel): void {
    this.notificacaoService.sucesso(
      `Compromisso ${compromisso.assunto} editado com sucesso!`
    );

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }

  tipoSelecionado(op: number): boolean {
    const controle = this.form.get('tipoLocal');

    if (!controle) return false;

    if (controle.pristine && controle.value == op) return true;

    return false;
  }
}
