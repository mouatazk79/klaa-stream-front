import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,RouterOutlet,OrderListModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {
  products!: null[];

}
