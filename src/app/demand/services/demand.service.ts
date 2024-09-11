import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demand } from '../../shared/models/demand';
import { Constants } from '../../shared/env/constants';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  protected readonly baseUrl: string;
  constructor(private httpClient:HttpClient,
    private constants:Constants
  ) { 
    this.baseUrl = constants.rootAPI;
  }

  getDemands(){
    return this.httpClient.get<Array<Demand>>(`${this.baseUrl}aggregator/demands`)  }
    
  }




