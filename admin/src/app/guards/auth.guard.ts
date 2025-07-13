import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap, filter } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Wait for initialization to complete, then check authentication
  return authService.isInitialized$.pipe(
    filter(isInitialized => isInitialized), // Wait until initialized
    take(1),
    switchMap(() => authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        console.log('🔒 Auth guard - User authenticated:', isLoggedIn);
        if (isLoggedIn) {
          return true;
        }
        // Store the attempted URL for redirecting after login
        console.log('🔒 Auth guard - Redirecting to login, attempted URL:', state.url);
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      })
    ))
  );
};
