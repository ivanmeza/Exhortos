import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { provideAnimations } from '@angular/platform-browser/animations';
import {
  withInterceptorsFromDi,
  provideHttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

import { Route, Routes, provideRouter } from '@angular/router';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { ApiInterceptor } from './app/Interceptor/api.interceptor';
import { PanelComponent } from './app/Modulos/panel/panel.component';

export const ROUTES: Route[] = [];
const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
];
const rutas: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/Modulos/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    // canActivate: [LoginGuard],
  },
  {
    path: 'panel',
    component: PanelComponent,
    // canActivate: [PanelGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'exhorto',
      },
      {
        path: 'exhorto',
        loadComponent: () =>
          import('./app/Modulos/panel/exhorto/exhorto.component').then(
            (m) => m.ExhortoComponent
          ),
      },
      {
        path: 'exhortos-nacionales',
        loadComponent: () =>
          import('./app/Modulos/panel/exhortos-nacionales/exhortos-nacionales.component').then(
            (m) => m.ExhortosNacionalesComponent
          ),
      },
      {
        path: 'exhortos-recibidos',
        loadComponent: () =>
          import('./app/Modulos/panel/exhortos-recibidos/exhortos-recibidos.component').then(
            (m) => m.ExhortosRecibidosComponent
          ),
      },
      {
        path: 'respuestas-pendientes',
        loadComponent: () =>
          import('./app/Modulos/panel/respuesta-pendientes/respuesta-pendientes.component').then(
            (m) => m.RespuestaPendientesComponent
          ),
      },
      {
        path: 'prueba',
        loadComponent: () =>
          import('./app/Modulos/panel/prueba/prueba.component').then(
            (m) => m.PruebaComponent
          ),
      },
    ]
  }
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];
bootstrapApplication(AppComponent, {

  providers: [
    { provide: NZ_ICONS, useValue: icons },
    //
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      NzLayoutModule,
      NzMenuModule,
      ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ),
    {
      provide: HTTP_INTERCEPTORS, //inyectamos el interceptor
      useClass: ApiInterceptor, //usamos la clase que creamos para el interceptor cada que hacemos una peticion
      multi: true, // con esto le decimos que puede tener varios interceptores
    },
    { provide: NZ_I18N, useValue: es_ES },
    provideHttpClient(withInterceptorsFromDi()), //se inyecta el httpclient con los interceptores que se le pasan por parametro
    provideAnimations(), //se inyectan las animaciones
    provideRouter(rutas), //se inyectan las rutas de la aplicacion
  ],
}).catch((err) => console.error(err));
