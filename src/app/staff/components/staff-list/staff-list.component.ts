import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Staff } from '../../../shared/models/staff';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ButtonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'staffs' },
    },
  ]
})
export class StaffListComponent implements OnInit{
viewDetails() {
throw new Error('Method not implemented.');
}
  staffs: Array<Staff> = [];
  constructor( private genericService: GenericService<Staff, Staff>
  ) {}

  ngOnInit(): void {
    this.getStaffs()
  }
  getStaffs(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.staffs = data.items || [];
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }

}


