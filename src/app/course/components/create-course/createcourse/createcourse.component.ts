import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../../shared/models/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GenericService, SERVICE_CONFIG } from '../../../../shared/services/generic.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule,DialogModule, ButtonModule, InputTextModule,FileUploadModule],
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
 newCourse:Course={
   name: '',
   field: '',
   description: '',
   imageURL:''
 }
 constructor(private confirmationService: ConfirmationService, private messageService: MessageService,private genericService:GenericService<Course,Course>){}
  
 addCourse(){
  this.genericService.add(this.newCourse).subscribe(
    {
      next:()=>{
        console.log('course added successefully')
      },
      error:(err)=>{
        console.log(err)
      }
    }
  )
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
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
}

}
