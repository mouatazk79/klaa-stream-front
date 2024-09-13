import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StreamingService } from '../../services/streaming.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private streamService: StreamingService) { }

  ngOnInit(): void {
    this.onPlayVideo();
  }

  onPlayVideo() {
    const filename = 'test'; 
    this.streamService.streamVideo().subscribe({
      next: (blob) => {
        const videoElement = this.videoPlayer.nativeElement;  
        const url = window.URL.createObjectURL(blob);  
        videoElement.src = url;
        videoElement.load();
        videoElement.play();
      },
      error: (err) => {
        console.error('Video stream error', err);
      }
    });
  }
}