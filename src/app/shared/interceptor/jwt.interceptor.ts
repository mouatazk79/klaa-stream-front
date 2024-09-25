import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('Authorization');
  if (token) {
    let parsedToken = JSON.parse(token).token;
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${parsedToken}`
      }
    });
  }
  return next(req);
};
