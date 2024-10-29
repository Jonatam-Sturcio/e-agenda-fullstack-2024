import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  CategoriaEditadaViewModel,
  CategoriaInseridaViewModel,
} from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-edicao-categoria',
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
  templateUrl: './edicao-categoria.component.html',
})
export class EdicaoCategoriaComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];

    this.form.patchValue(categoria);
  }

  get titulo() {
    return this.form.get('titulo');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }
    const id = this.route.snapshot.params['id'];
    const editarCategoriaVm = this.form.value;

    const observer: PartialObserver<CategoriaEditadaViewModel> = {
      next: (categoriaEditada) => this.processarSucesso(categoriaEditada),
      error: (erro) => this.processarFalha(erro),
    };

    this.categoriaService.editar(id, editarCategoriaVm).subscribe(observer);
  }

  private processarSucesso(categoria: CategoriaEditadaViewModel): void {
    this.notificacaoService.sucesso(
      `Categoria ${categoria.titulo} editada com sucesso!`
    );

    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}
