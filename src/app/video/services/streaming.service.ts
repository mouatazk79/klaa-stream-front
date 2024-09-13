import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../shared/env/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  private baseURL:string;
  constructor(private httpClient:HttpClient,private constants:Constants) {
    this.baseURL=constants.rootAPI
   }

   streamVideo(): Observable<Blob> {
    return this.httpClient.get(`http://localhost:8090/api/v1/videos/test`, { responseType: 'blob' });
  }
}
