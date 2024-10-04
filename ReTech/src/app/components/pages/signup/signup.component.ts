import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import Validation from '../../../utils/validation';

import { AuthService } from '../../../services/auth/auth.service';
import { SignUpForm } from '../../../types/signup.request.type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkActive,
  ],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'], // Corrigido de styleUrl para styleUrls
})
export class SignupComponent {
  submitted: boolean = false;
  hidePassword: boolean = true;
  protected isLoading = false;
  protected signupForm: FormGroup; // Declarar o formulário aqui

  constructor(
    private formBuilderService: NonNullableFormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    // Inicializar o formulário aqui
    this.signupForm = this.formBuilderService.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, Validation.match('password', 'confirmPassword')],
      ],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.signupForm.invalid) {
      if (this.signupForm.get('email')?.hasError('email')) {
        this.toastr.error('Email inválido');
      }
      if (this.signupForm.get('password')?.hasError('minlength')) {
        this.toastr.error('A senha deve ter pelo menos 8 caracteres');
      }
      if (this.signupForm.get('confirmPassword')?.hasError('matching')) {
        this.toastr.error('A senha e a confirmação devem ser iguais');
      }
      return;
    }

    this.isLoading = true;
    const dadosSignup: SignUpForm = this.signupForm.value;
    dadosSignup.role = 'USER';
    this.authService.signUp(dadosSignup).subscribe({
      next: () => {
        this.toastr.success('Usuário criado com sucesso');
        this.signupForm.reset();
      },
      error: (value) => {
        this.isLoading = false;
        if (value.status === 409) {
          this.toastr.error('Email já existe');
          return;
        }
        this.toastr.error(
          'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.'
        );
      },
    });
  }
}
