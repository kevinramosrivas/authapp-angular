import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth-service.service';


@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  private authService = inject(AuthService);

  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;


    return this.authService.getUsers().pipe(
      map(users => {
        const emails = users.map(user => user.email);
        return emails.includes(email) ? { notAvailable: true } : null;
      })
    );

  }


}