import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CourseDetailsComponent } from "../course-details/course-details.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, CourseDetailsComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  isCourseClicked:boolean=false;

}
