import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../env/constants';

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

  activate(userName:string):any{
   return this.httpClient.put<null>(`${this.baseUrl}users/`+userName,null) }
}
