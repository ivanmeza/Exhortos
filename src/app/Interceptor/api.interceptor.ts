import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  //PRUEBAS LOCALES
  baseUrl = 'http://10.25.70.150/php_c/exhorto/';


  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let apiReq: any;
    if (request.url.startsWith('http')) {
      // si la condicion http en verdadera se clona la peticion y se le asigna la url de la api

      apiReq = request.clone({ url: request.url });
    } else { //si la url no comienza con http
      const token = localStorage.getItem('token'); // se obtiene el token del localstorage
      // se clona la peticion y se le asigna la url de la api y el token en los headers de la peticion clonada para que se envie al servidor y se pueda validar el token en el backend
      //la url de la api se obtiene del archivo environment.ts y se concatena con la url de la peticion original
      apiReq = request.clone({
        url: `${environment.baseUrl}${request.url}`,
        //mando de cabezera el token para que el backend lo valide y pueda acceder a los datos
        setHeaders: {
          // token: `${token}`,
          'X-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9lc3RhZG8iOiIxNyIsIm5vbWJyZSI6Ik1vcmVsb3MiLCJhYnJlYmlhdHVyYSI6Ik1vci4ifQ.JNY61c1DzIiNluifNjshM6TEYP0FauRaEgSpg7wpniI'
        },
      });
    }
    //se retorna la peticion clonada u original con la url de la api y el token en los headers de la peticion clonada para que se envie al servidor y se pueda validar el token en el backend
    return next.handle(apiReq);
  }
}
