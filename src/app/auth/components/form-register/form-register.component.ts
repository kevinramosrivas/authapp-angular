import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { UserRegisterInfo } from '../../interfaces/register-user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmailValidator } from '../../validators/email-validator.service';



@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormRegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router);
  public isLoad = false;
 
  private body : UserRegisterInfo = {
    name: '',
    email: '' ,
    password: '',
    role: '',
    avatar: 'https://ui-avatars.com/api/?name=Jhon+Doe',
  };

  constructor(private emailValidator: EmailValidator) { }

  public registerForm = this.fb.group({
    name: ['Jhon Doe', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['jhon_doe@gmail.com', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')],[this.emailValidator.validate.bind(this.emailValidator)]],
    password: ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  public isValidField(field: string): boolean|undefined {
    return !((this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid);
  }


  onSubmit() {
    this.isLoad = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.body = {
      name: this.registerForm.get('name')?.value!,
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.value.password!,
      role: this.authService.currentUser()?.role === 'admin' ? 'admin' : 'customer',
      avatar: 'https://ui-avatars.com/api/?name=' + (this.registerForm.value.name)?.replace(/\s+/g, '+'),
    };

    this.authService.registerUser(this.body).subscribe(
    {
      next: () => {
        this.isLoad = false;
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente, seras redirigido al inicio de sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['auth/login']);
        })

      },
      error: (error) => {
        this.isLoad = false;
        Swal.fire({
          title: 'Error',
          text: "Error al registrar usuario",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }

 }
