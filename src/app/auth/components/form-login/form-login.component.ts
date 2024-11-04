import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { UserLogin } from '../../interfaces/register-user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormLoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public returnUrl = '';
  public isLoad = false;
  
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] ; 
  }

  private body : UserLogin = {
    email: '',
    password: ''
  };
  public loginError = false;
  
  public loginForm = this.fb.group({
    email: ['jhon_doe@gmail.com', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  });

  public isValidField(field: string): boolean|undefined {
    return !((this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid);
  }
  login(){
    this.isLoad = true;
    this.body = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.authService.loginUser(this.body).subscribe({
      next: () => {
        this.isLoad = false;
        this.router.navigate([this.returnUrl || '/']);
      },
      error: (err) => {
        this.isLoad = false;
        this.router.navigate(['auth/login']);
        this.loginError = true;
      }
    });
  }
}
