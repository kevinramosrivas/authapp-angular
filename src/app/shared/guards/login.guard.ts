import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.isLogged().subscribe(
      {
        error: () => {
          router.navigate(['/auth/login'] , { queryParams: { returnUrl: state.url } });
        }
      }
  );
  return authService.isLogged();
};



