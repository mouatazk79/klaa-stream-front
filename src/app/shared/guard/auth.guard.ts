import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(JwtService);
    const router = inject(Router);
    if (authService.isTokenExpired()) {
      router.navigate(['/login']);
      return false;
    }
  return true;
};
