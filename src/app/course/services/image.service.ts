import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../shared/env/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
 
  protected readonly baseURL:string;

  constructor(private httpClient:HttpClient,private constants:Constants) {
    this.baseURL=constants.rootAPI
   }
   uploadCourseCover(courseName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);  
  
    return this.httpClient.post(`${this.baseURL}courses/upload-cover/` + courseName, formData, { responseType: 'blob' });
  }
  

   getImage(relativePath:string): Observable<Blob>{
    return this.httpClient.get(`${this.baseURL}courses/image` + relativePath, { responseType: 'blob' });
   }
}
