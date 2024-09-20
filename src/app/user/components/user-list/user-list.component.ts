import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { User } from '../../../shared/models/user';
import { ButtonModule } from 'primeng/button';
import { CreateUserComponent } from '../add-user/create-user/create-user.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,ToastModule, ConfirmPopupModule,CreateUserComponent,CommonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers:[
    ConfirmationService, MessageService,
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'users' },
    },
  ]
})
export class UserListComponent {

  users: Array<User> = [];
  constructor( private confirmationService: ConfirmationService, private messageService: MessageService,private genericService: GenericService<User, User>
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.users = data.items || [];
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }

  
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    disactivate(event: Event) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Are you sure you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
  }
}
