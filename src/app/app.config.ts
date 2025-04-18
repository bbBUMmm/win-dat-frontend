import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { lucideBox, lucideTriangleAlert } from '@ng-icons/lucide';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {DefaultOAuthInterceptor, OAuthModule} from 'angular-oauth2-oidc';
import {NgIconsModule, provideIcons} from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgIconsModule),
    provideIcons({ lucideBox, lucideTriangleAlert }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
      // withInterceptors([authInterceptor])
    ),
    importProvidersFrom(
      OAuthModule.forRoot({
        resourceServer: {
          sendAccessToken: true
        },
      })
    ),

    {provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true}

    // { provide: LOCALE_ID, useValue: 'sk' }
  ]
};
