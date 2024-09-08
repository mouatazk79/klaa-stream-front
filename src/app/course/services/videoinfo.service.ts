import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../shared/env/constants';
import { VideoInfo } from '../../shared/models/videoinfo';

@Injectable({
  providedIn: 'root'
})
export class VideoinfoService {

  protected readonly baseUrl: string;
  constructor(private httpClient:HttpClient,
    private constants:Constants
  ) { 
    this.baseUrl = constants.rootAPI;
  }


  videoList(){
    return this.httpClient.get<Array<VideoInfo>>(`${this.baseUrl}videoinfos/course_001`)  }
}
