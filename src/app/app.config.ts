import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptor/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { SERVICE_CONFIG } from './shared/services/generic.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    importProvidersFrom([
        JwtModule.forRoot({
          config: {
            tokenGetter: () => localStorage.getItem('Authorization')
          }
        })
      ]),
      { provide: SERVICE_CONFIG, useValue: { resourceEndpoint: 'courses' } },
      { provide: SERVICE_CONFIG, useValue: { resourceEndpoint: 'documents' } },

  ]
};
