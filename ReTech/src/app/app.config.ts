import { provideToastr } from 'ngx-toastr';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth-interceptor.interceptor';
import { HandlerErrorsInterceptor } from './interceptors/errors/handler-errors.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),  // Ensure this is set up correctly
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, HandlerErrorsInterceptor])), provideAnimationsAsync(),
  ],
};
