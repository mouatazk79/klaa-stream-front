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

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,FileUploadModule],
  templateUrl: './createcourse.component.html',
  styleUrl: './createcourse.component.scss',
  providers:[
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
 constructor(private genericService:GenericService<Course,Course>){}
  
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


}
