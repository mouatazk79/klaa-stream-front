import { Component } from '@angular/core';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { VideoInfo } from '../../../shared/models/videoinfo';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-videolist',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './videolist.component.html',
  styleUrl: './videolist.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'videoinfos' },
    },
  ]
})
export class VideolistComponent {
  videos:Array<VideoInfo>=[];
  constructor(private genericService:GenericService<VideoInfo,VideoInfo>){}

  ngOnInit(): void {
    this.getVideos()
  }
  getVideos(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.videos = data.items || [];
        console.log(this.videos)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }


}
