import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StreamingService } from '../../services/streaming.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoUrl = 'http://localhost:8090/api/v1/videos/stream';

  ngOnInit() {
    this.streamVideo();
  }

  async streamVideo() {
    const video = this.videoPlayer.nativeElement;
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', async () => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      let offset = 0;
      const chunkSize = 1024 * 1024; 

      while (true) {
        
        const response = await fetch(this.videoUrl, {
          headers: {
            Range: `bytes=${offset}-${offset + chunkSize - 1}`,
          },
        });

        if (!response.ok) break;

        const chunk = await response.arrayBuffer();
        if (chunk.byteLength === 0) break;

        await new Promise<void>((resolve) => {
          sourceBuffer.appendBuffer(chunk);
          sourceBuffer.addEventListener('updateend', () => resolve(), { once: true });
        });

        offset += chunk.byteLength;
      }

      mediaSource.endOfStream();
    });
  




  
//   @Input() videoName = '';
//   @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

//   constructor(private streamService: StreamingService) {}

//   ngAfterViewInit(): void {
//     this.onPlayVideo('bytes=0-1000');
//   }

//   playVideo() {
//     const videoElement = this.videoPlayer.nativeElement;
//     videoElement.play().catch(error => {
//       console.error('Error attempting to play:', error);
//     });
//   }

//   onPlayVideo(range: string) {
//     this.streamService.streamVideo(range).subscribe({
//       next: (response) => {
//         const videoElement = this.videoPlayer.nativeElement;
//         const blob = response.body;
  
//         if (blob) {
//           console.log('Received blob:', blob);
//           const url = window.URL.createObjectURL(blob);
//           console.log('Blob URL created:', url);
//           videoElement.src = url;
//           videoElement.load();
//           videoElement.play().catch(error => {
//             console.error('Error attempting to play:', error);
//           });
//         } else {
//           console.error('Received null blob in the response');
//         }
//       },
//       error: (err) => {
//         console.error('Video stream error', err);
//       }
//     });
//   }
  
}
}