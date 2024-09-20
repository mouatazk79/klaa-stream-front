import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../../shared/models/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GenericService, SERVICE_CONFIG } from '../../../../shared/services/generic.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageService } from '../../../services/image.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map, Observable, of, throwError } from 'rxjs';
@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [ConfirmDialogModule, CheckboxModule,ToastModule,FormsModule,DialogModule, ButtonModule, InputTextModule,FileUploadModule],
  templateUrl: './createcourse.component.html',
  styleUrl: './createcourse.component.scss',
  providers:[
    ConfirmationService, MessageService
    ,
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'courses' },
    },
  ]
})
export class CreatecourseComponent {
 @Input() visible=false;
 selectedFile: File | undefined;
 newCourse:Course={
   name: '',
   field: '',
   description: '',
   visible:true,
 }
 constructor(private imageService:ImageService,private router:Router,private confirmationService: ConfirmationService, private messageService: MessageService,private genericService:GenericService<Course,Course>){
 }
 onFileSelected(event: any): void {
  this.selectedFile = event.files[0]; 
  console.log(this.selectedFile)
  console.log(this.newCourse)

}
  
addCourse(): void {
  this.genericService.add(this.newCourse).pipe(
    switchMap((response: Course) => {
      console.log('Course added successfully:', response);
      return this.uploadCover(this.newCourse.name); 
    })
  ).subscribe({
    next: (combinedResponse) => {
      console.log('Course added and cover uploaded successfully:', combinedResponse);
    }
  });
}

uploadCover(courseId: string): Observable<any> { 
  if (this.selectedFile) {
    return this.imageService.uploadCourseCover(courseId, this.selectedFile).pipe(
      map((response) => {
        console.log('File uploaded successfully:', response);
        return { message: 'Cover uploaded successfully' };
      })
    );
  } else {
    return of({ message: 'No file selected for upload' }); 
  }
}
 confirm() {
  this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
          this.addCourse()
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['courses']);
          });      

        },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
}

}
