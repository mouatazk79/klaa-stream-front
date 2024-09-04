import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../../shared/models/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../shared/models/authentication-response';
import { Constants } from '../../shared/env/constants';

@Injectable({
  providedIn: 'root',
  
})
export class AuthenticationService {

  constructor(private http:HttpClient,private constants:Constants) { }
   login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.constants.rootAPI+'auth/authenticate', authRequest);
  }
  logout(){
    localStorage.removeItem('Authorization');
  }
}
