import { inject, Injectable } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { GenericResponse } from '../models/generic-page-response';
import { GenericService } from '../services/generic.service';

export const GenericResolverService: ResolveFn<GenericResponse<any>> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const genericService = inject(GenericService<any, any>);
    return genericService.getList().pipe(
      tap(data => console.log('Resolver retrieved data:', data)),
      catchError(error => {
        console.error('Resolver Error:', error);
        return of({ items: [] }); 
      })
    );
};