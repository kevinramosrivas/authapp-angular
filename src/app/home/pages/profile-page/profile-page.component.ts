import { AfterContentInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../../auth/services/email-validator.service';
import { UserUpdate } from '../../../auth/interfaces/register-user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImageValidator } from '../../../auth/services/image-validator.service';

@Component({
  templateUrl: './profile-page.component.html',
  styles: `
    :host {
      display: block;
    }
    .container{
      padding-bottom : 13rem;
    }
  `,
})
export class ProfilePageComponent { 
  private authService =  inject(AuthService);
  public currentUser = this.authService.currentUser;
  private fb = inject(FormBuilder);
  private elementRef = inject(ElementRef);
  private router      = inject(Router);
  @ViewChild('btncloseprofileModal') closeModal: ElementRef = this.elementRef.nativeElement; 
  @ViewChild('btnclosepasswordModal') passwordModal: ElementRef = this.elementRef.nativeElement; 
  
  constructor(private emailValidator: EmailValidator,private imageValidator: ImageValidator) {};
  


  

  public profileForm = this.fb.group({
    name: [this.currentUser()?.name ,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    //email: [this.currentUser()?.email ,[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')],[this.emailValidator.validate.bind(this.emailValidator)]],
    avatar: [this.currentUser()?.avatar , [Validators.required, Validators.pattern('https?://.+')]],
  });

  public passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  }
  ,{
    validators: (formGroup) => {
      const password = formGroup.get('newPassword')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { notSame: true };
    }
  }
  );


  onOpenModalProfile(){
    this.profileForm.reset({
      name: this.currentUser()?.name,
      avatar: this.currentUser()?.avatar,
    });
  }
  

  onUpdateProfile() {

    let user = {
      id: this.currentUser()?.id,
      name: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
      avatar: this.profileForm.get('avatar')?.value,
    }
    
      this.authService.updateUser(user as UserUpdate).subscribe({
        next: (resp) => {
          this.authService.checkAuthentication();
          //cerrar modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            title: "Perfil actualizado",
            text: "Los datos de tu perfil han sido actualizados correctamente",
            icon: "success",
          });
          //resetear formulario
          this.profileForm.reset();
        },
        error: (err) => {
          this.router.navigate(['home/profile']);
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al actualizar tu perfil",
            icon: "error",
          });
        }
      });
  }
  onUpdatePassword() {
    //comprobar si la contraseña actual es correcta
    this.authService.checkActualPassword({
      email: this.currentUser()?.email!,
      password: this.passwordForm.get('password')?.value!,
    }).subscribe({
      next: (resp) => {
        this.updatePassword();
      },
      error: (err) => {
        this.router.navigate(['home/profile']);
        Swal.fire({
          title: "Error",
          text: "La contraseña actual no es correcta",
          icon: "error",
        });
      }
    });

  }

  updatePassword() {
    let user = {
      id: this.currentUser()?.id,
      password: this.passwordForm.get('newPassword')?.value,
    }
    this.authService.updateUser(user as UserUpdate).subscribe({
      next: (resp) => {
        this.passwordModal.nativeElement.click();
        Swal.fire({
          title: "Contraseña actualizada",
          text: "Tu contraseña ha sido actualizada correctamente",
          icon: "success",
        });
        //resetear formulario
        this.passwordForm.reset();
      },
      error: (err) => {
        this.router.navigate(['home/profile']);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al actualizar tu contraseña",
          icon: "error",
        });
      }
    });
  }



  public isValidField(field: string, form:FormGroup): boolean|undefined {
    return !((form.get(field)?.touched || form.get(field)?.dirty) && !form.get(field)?.valid);
  }

  public passwordMatch(): boolean {
    return this.passwordForm.get('newPassword')?.value === this.passwordForm.get('confirmPassword')?.value;
  }


}
