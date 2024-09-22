import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { VideoInfo } from '../../../shared/models/videoinfo';
import { VideoinfoService } from '../../services/videoinfo.service';
import { VideoplayerComponent } from "../../../video/components/videoplayer/videoplayer.component";

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OrderListModule, VideoplayerComponent],
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
  visible:boolean=false;
  videoList: Array<VideoInfo> = [];
  @Input() courseName:string='';
  selectedVideo:string=''
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
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent){
    console.log(event)
    this.visible=false
    // this.selectedCourseName=''
  }
  runVideo(videoName:string){
    this.selectedVideo=videoName
    this.visible=true
  }
}

