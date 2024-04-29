import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { UserLogin } from '../../interfaces/register-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormLoginComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private body : UserLogin = {
    email: '',
    password: ''
  };

  public loginForm = this.fb.group({
    email: ['jhon_doe@gmail.com', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    this.body = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.authService.loginUser(this.body).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
