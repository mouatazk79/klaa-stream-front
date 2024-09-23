import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  //  streamVideo(range: string) : Observable<any> {
  //   const headers = new HttpHeaders().set('Range', range);
  //   return this.httpClient.get(`http://localhost:8090/api/v1/videos/stream`
  //     ,{
  //       headers: headers,
  //       responseType: 'blob', 
  //       observe: 'response',   
  //     });
  // }
  // getVideoChunk(rangeStart: number, rangeEnd: number): Observable<Blob> {
  //   const headers = new HttpHeaders({
  //     'Range': `bytes=${rangeStart}-${rangeEnd}`
  //   });

  //   return this.httpClient.get(`http://localhost:8090/api/v1/videos/stream`, {
  //     headers: headers,
  //     responseType: 'blob' // Important for binary data
  //   });
  // }
  streamVideo(range: string): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Range', `bytes=${range}`);
    return this.httpClient.get("http://localhost:8090/api/v1/videos/stream", { headers, responseType: 'blob', observe: 'response' });
  }
 
}