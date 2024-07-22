import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent {

  staffs!: null[];

  selectedstaffs!: null;

  constructor() {}

}
