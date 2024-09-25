import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../env/constants';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  protected readonly baseUrl: string;
  constructor(private httpClient:HttpClient,
    private constants:Constants
  ) { 
    this.baseUrl = constants.rootAPI;
  }

  getStaffByUserName(userName:string):Observable<Staff>{
return this.httpClient.get<Staff>(`${this.baseUrl}staffs/username/`+userName)
  }

  activate(userName:string):any{
   return this.httpClient.put<null>(`${this.baseUrl}users/`+userName,null) }

   lock(userName:string):any{
    return this.httpClient.put<null>(`${this.baseUrl}users/lock/`+userName,null) }
}
