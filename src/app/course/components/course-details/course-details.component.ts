import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { VideoInfo } from '../../../shared/models/videoinfo';
import { VideoinfoService } from '../../services/videoinfo.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,RouterOutlet,OrderListModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'videoinfos/course_001' },
    },
  ]
})
export class CourseDetailsComponent implements OnInit,OnDestroy {
  
  videoList: Array<VideoInfo> = [];
  @Input() courseName:string='';
  constructor( private genericService: GenericService<VideoInfo, VideoInfo>,
    private videoInfoService:VideoinfoService
  ) {}
  ngOnInit(): void {
    if(this.courseName!==''){
      this.getVideoList()
    }
    
  }
  ngOnDestroy(): void {
    this.videoList=[]
    this.courseName=''
  }
  getVideoList(){
    this.videoInfoService.videoList().subscribe({
      next:(data:Array<VideoInfo>)=>{
        this.videoList = data || [];
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
            }
    })
  }
}

