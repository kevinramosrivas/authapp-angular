import { Directive, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth-service.service';

@Directive({
  selector: '[appValidEmail]',
  standalone: true,
})
export class EmailValidator implements AsyncValidator{
  private authService = inject(AuthService);
  private resp = {
    isAvailable: false,
  }
  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const email = control.value;

    return this.authService.validateEmail(email).pipe(
      map((resp) => {
        this.resp = resp;
        return resp.isAvailable ? null : { emailTaken: true };
      })
    );


    

  }
  /**
   * Registers a callback function to be called when the validator has changed.
   * @param fn The callback function to be called when the validator has changed.
   */
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

 }
