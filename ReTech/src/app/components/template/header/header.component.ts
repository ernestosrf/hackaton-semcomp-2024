import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService, UserRole } from '../../../services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatSlideToggleModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Correção aqui
})
export class HeaderComponent {
  role?: UserRole;

  constructor(private authService: AuthService) {
    this.initializeUserRole();
  }

  initializeUserRole() {
    this.role = this.authService.getUserDetail()?.role;
  }

  signOut() {
    this.authService.signOut();
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  }
}
