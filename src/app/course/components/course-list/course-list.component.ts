import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Course } from '../../../shared/models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, CourseDetailsComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'courses' },
    },
  ]
})
export class CourseListComponent implements OnInit{
    courses: Array<Course> = [];
    isCourseClicked:boolean=false;
    selectedCourseName:string='';
    constructor(private elementRef: ElementRef ,private genericService: GenericService<Course, Course>
    ) {}
  
 
    ngOnInit(): void {
      this.getCourses()
    }
    getCourses(){
      this.genericService.getList().subscribe({
        next:(data)=>{
          this.courses = data.items || [];
          console.log(this.courses)
        },
        error:(err)=>{
          console.log(err)
        
        }
      })
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscape(event: KeyboardEvent){
      console.log(event)
      this.isCourseClicked=false
      this.selectedCourseName=''
    }
   
  //   @HostListener('document:click', ['$event.target'])
  // onClick(targetElement: HTMLElement) {
  //   if (!this.isCourseClicked) {
  //     return; 
  //   }
  //   const clickedInside = this.elementRef.nativeElement.querySelector('app-course-details')?.contains(targetElement);
  //   if (!clickedInside) {
  //     this.isCourseClicked = false;
  //     this.selectedCourseName = '';
  //   }
  // }

   onCourseClick(course:Course){
    this.isCourseClicked=true
    this.selectedCourseName=course.name;
   }

}

