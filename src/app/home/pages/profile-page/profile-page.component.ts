import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../../auth/services/email-validator.service';

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
  
  constructor(private emailValidator: EmailValidator,) { }
  

  public profileForm = this.fb.group({
    name: [this.currentUser()?.name,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: [this.currentUser()?.email,[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')],[this.emailValidator.validate.bind(this.emailValidator)]],
    avatar: [this.currentUser()?.avatar, [Validators.required]],
  });

  public passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  });


}
