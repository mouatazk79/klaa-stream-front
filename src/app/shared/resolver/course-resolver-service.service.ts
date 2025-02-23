import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GenericService } from '../services/generic.service';
import { catchError, of, tap } from 'rxjs';
import { Course } from '../models/course';
import { GenericResponse } from '../models/generic-page-response';

export const CourseResolverService: ResolveFn<GenericResponse<Course>> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const genericService = inject(GenericService<Course, Course>);
    return genericService.getList().pipe(
      tap(data => console.log('Resolver retrieved data:', data)),
      catchError(error => {
        console.error('Resolver Error:', error);
        return of({ items: [] }); 
      })
    );
};