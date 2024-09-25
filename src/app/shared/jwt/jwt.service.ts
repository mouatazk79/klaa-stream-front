import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

   token:string|null = localStorage.getItem('Authorization');
  constructor(private router:Router,private jwtHelper:JwtHelperService) { }

  getUserName():string{
    if(this.token){
      const tokenPayload:any = jwtDecode(this.token);
      let userName=tokenPayload.sub
      return userName;
    }
    return'';
  }
  getRole():string{

    if(this.token){
      const tokenPayload:any = jwtDecode(this.token);
      let userName=tokenPayload.sub
      userName='ADMIN'
      return userName;
    }
    return'ADMI';
  }
  

  isTokenExpired():boolean{
    const token = localStorage.getItem('Authorization');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login'])
  }
}
