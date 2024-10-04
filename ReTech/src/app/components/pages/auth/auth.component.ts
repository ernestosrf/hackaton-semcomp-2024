import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth/auth.service';

import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';




 interface LoginForm {
  email: FormControl;
  password: FormControl;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
   
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm!: FormGroup<LoginForm>;
  protected isLoading = false;
  constructor(private AuthService: AuthService, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitForm() {
    this.isLoading = true;
    this.AuthService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        error: (value) => {
          this.isLoading = false;
          switch (value.error.message) {
            case 'Bad credentials':
              this.toastr.error('Login ou senha inválidos');
              break;
            case 'User is disabled':
              this.toastr.error('Usuário inativo');
              break;
          }
        },
      });
  }
}
