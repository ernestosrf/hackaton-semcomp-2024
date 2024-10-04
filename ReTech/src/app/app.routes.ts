import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LayoutComponent } from './components/template/layout/layout.component';

import { SignupComponent } from './components/pages/signup/signup.component';

export const routes: Routes = [
  {
    path: 'home',
   component: HomeComponent,title: 'home',

  },
  {
    path: 'auth',
   component: AuthComponent,title: 'login',

  },

  {
    path: 'signup',
   component: SignupComponent,title: 'signup',

  },



  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },

    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
   title: 'Pagina não encontrada',
  },
];
