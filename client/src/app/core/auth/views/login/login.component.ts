import {
  NgIf,
  NgForOf,
  NgSwitch,
  NgSwitchCase,
  AsyncPipe,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import {
  AutenticarUsuarioViewModel,
  TokenViewModel,
  UsuarioTokenViewModel,
} from '../../models/auth.models';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificacaoService } from '../../../notificacao/notificacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.minLength(30),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  get login() {
    return this.form.get('login');
  }
  get senha() {
    return this.form.get('senha');
  }
  public entrar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, corrija os campos inválidos do formulário.'
      );
      return;
    }

    const loginUsuario: AutenticarUsuarioViewModel = this.form.value;

    const observer = {
      next: (res: TokenViewModel) => this.processarSucesso(res),
      error: (erro: any) => this.processarFalha(erro),
    };

    this.authService.login(loginUsuario).subscribe(observer);
  }

  private processarSucesso(res: TokenViewModel) {
    this.usuarioService.logarUsuario(res.usuario);
    this.localStorageService.salvarTokenAutenticacao(res);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(err: Error) {
    this.notificacaoService.erro(err.message);
  }
}