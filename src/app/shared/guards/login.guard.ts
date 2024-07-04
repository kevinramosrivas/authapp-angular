import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(route,state);
  if (authService.isLogged()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
