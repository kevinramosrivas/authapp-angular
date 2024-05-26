import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MessageAuthComponent } from './components/message-auth/message-auth.component';
import { EmailValidator, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    FormLoginComponent,
    FormRegisterComponent,
    AuthLayoutComponent,
    MessageAuthComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
