import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demand } from '../../shared/models/demand';
import { Constants } from '../../shared/env/constants';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  protected readonly baseUrl: string;
  private totalDemands = new BehaviorSubject<number>(0);
  currentDemandsCount = this.totalDemands.asObservable();

  constructor(private httpClient:HttpClient,
    private constants:Constants
  ) { 
    this.baseUrl = constants.rootAPI;
  }

  getDemands(){
    return this.httpClient.get<Array<Demand>>(`${this.baseUrl}aggregator/demands`)
    .pipe(
      tap((demands: Array<Demand>) => {
        this.updateDemandsCount(demands.length); 
      })
    );
}

  updateDemandsCount(count: number) {
    this.totalDemands.next(count);
  }
    
  }




