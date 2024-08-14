import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { Router } from '@angular/router';
import { LoginClass } from 'src/app/Model/login/login';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private ServicioLogin = inject(LoginService);

  validateForm!: FormGroup;
  loginModel: LoginClass = new LoginClass();
  passwordVisible: boolean = false;
  btnLoading: boolean = false;
  menuOptions: number[] = [];
  ngOnInit(): void {
    this.deleteLocalStorageMenuOptions();
    this.validateForm = this.formBuilder.group({
      usrname: [null, [Validators.required, Validators.pattern('^[^\\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: [null, [Validators.required, Validators.pattern("[a-zA-Z-/#@$!%*#?&0-9]{8,16}")]],
    });
  }
  deleteLocalStorageMenuOptions(){
    localStorage.removeItem('menuOptions');
  }
  async LoginSubmit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      if (this.btnLoading) return;
      this.btnLoading = true;

      try {
        const response = await this.ServicioLogin.Login(this.loginModel);
        if(response==null){
          console.log('LA RESPUESTA ES NULA');
          return;
        }
        if(!response.accesso){
          console.log('EL ACCESO ES FALSE');
          return;
        }
        if(response!==null && response.accesso){
          this.menuOptions = response.vista;
          if(this.menuOptions.length>0){
            localStorage.setItem('menuOptions', JSON.stringify(this.menuOptions));
            const opcionesStorage = JSON.parse(localStorage.getItem('menuOptions') || '[]');
            //si lo que mande a localstorage es igual a lo que me manda mi api entonces redirige a panel
            if (this.arraysAreEqual(this.menuOptions, opcionesStorage)) {
              this.router.navigate(['/panel']);
            }else{
              console.log('NO COINCIDEN LAS OPCIONES DEL MENU CON LAS QUE SE MANDARON');
            }

          }else{
            console.log('NO HAY OPCIONES PARA EL MENU');
          }
        }else{
          console.log('NO SE PUDO ACCEDER');
        }
        this.btnLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  }

  arraysAreEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}
