import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule, // Adicione esta linha
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
}
