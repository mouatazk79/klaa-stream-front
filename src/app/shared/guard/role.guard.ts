import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtService } from '../jwt/jwt.service';

export const roleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state) => {
  const expectedRole = route.data['expectedRole'];
   const token = localStorage.getItem('Authorization');
   const authService = inject(JwtService);
   const router = inject(Router);
   if (token) {
  const tokenPayload:any = jwtDecode(token);
  if (
    authService.isTokenExpired() || 
    tokenPayload.role !== expectedRole
  ) {
    router.navigate(['/login']);
    return false;
  }
   }

  return true;
};
