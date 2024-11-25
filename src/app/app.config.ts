import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {ApiConection} from "./Shared/ApiConection";
import {AuthGuard} from "./Shared/auth.guard";


export const appConfig: ApplicationConfig = {
  providers: [
    ApiConection,
    AuthGuard,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations()
  ]
};
