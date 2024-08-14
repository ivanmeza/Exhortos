import { inject, Injectable } from '@angular/core';
import { LoginClass } from '../Model/login/login';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from './Interfaces/Login/ResponseLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // constructor() { }
  private http = inject(HttpClient);
  private token = environment.tokenMorelos;
  private url = environment.baseUrl;
  Login(formData:LoginClass) {
    return this.http.post<ResponseLogin>(this.url + 'auth/token',
      { headers: { 'X-Api-Key': this.token } }).toPromise();
  }

}
