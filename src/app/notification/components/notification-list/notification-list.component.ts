import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Notification } from '../../../shared/models/notification';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'notifications' },
    },
  ],
  imports: [RouterOutlet,CommonModule,ButtonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
 templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent implements OnInit{
viewDetails() {
throw new Error('Method not implemented.');
}
  notifications: Array<Notification> = [];
  constructor( private genericService: GenericService<Notification, Notification>
  ) {}

  ngOnInit(): void {
    this.getNotifications()
  }
  getNotifications(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.notifications = data.items || [];
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }

}


