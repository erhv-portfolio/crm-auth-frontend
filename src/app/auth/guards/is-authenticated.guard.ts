import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
/**
 * La unica funcion de este guard es decir si está autenticado o no
 * @param route
 * @param state
 * @returns
 */
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router      = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  if(authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
