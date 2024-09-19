import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterOutlet,CommonModule,DropdownModule,CalendarModule,FormsModule,SidebarComponent,ConfirmDialogModule, ToastModule,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers:[
    ConfirmationService, MessageService
    ,
   
  ]
})
export class EditProfileComponent {
  dialog=true
  user = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    phoneNumber: '',
    gender: undefined
  };
  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService){}

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