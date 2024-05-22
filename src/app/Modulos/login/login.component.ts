import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { Router } from '@angular/router';
import { LoginClass } from 'src/app/Model/login/login';

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

  validateForm!: FormGroup;
  loginModel: LoginClass = new LoginClass();
  passwordVisible: boolean = false;
  btnLoading: boolean = false;
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      usrname: [null, [Validators.required, Validators.pattern('^[^\\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: [null, [Validators.required, Validators.pattern("[a-zA-Z-/#@$!%*#?&0-9]{8,16}")]],
    });
  }

  async LoginSubmit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.router.navigate(['/panel']);
      // console.log(this.loginModel);
      // if (this.btnLoading) return;
      // this.btnLoading = true;
    }
  }
}
