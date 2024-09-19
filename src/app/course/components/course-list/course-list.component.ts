import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Course } from '../../../shared/models/course';
import { ImageService } from '../../services/image.service';
import { ButtonModule } from 'primeng/button';
import { CreatecourseComponent } from "../create-course/createcourse/createcourse.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, CourseDetailsComponent, ButtonModule, CreatecourseComponent],
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
    constructor(private imageService:ImageService,private elementRef: ElementRef ,private genericService: GenericService<Course, Course>
     ) {}
  
 
    ngOnInit(): void {
      this.getCourses()
    }
    getCourses() {
      this.genericService.getList().subscribe({
        next: (data) => {
          this.courses = data.items || [];
          console.log(this.courses)
          this.courses.forEach(course => {
            if (course.imageURL) {
              this.loadImage(course);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    loadImage(course: Course) {
      this.imageService.getImage(course.imageURL!).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          console.log(blob); 
          course.imageURL = objectURL; 
        },
        error: (err) => {
          console.error('Error loading image:', err);
        }
      });
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
   visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

}

