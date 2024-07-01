import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ImageValidator implements AsyncValidator {
  private http = inject(HttpClient);

  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const image = control.value;

    //comprobar si la url de la
    return this.http.get(image).pipe(
      map((response) => {
        console.log(response);
        return response ? null : { notAvailable: true };
      })
    );

  }


}