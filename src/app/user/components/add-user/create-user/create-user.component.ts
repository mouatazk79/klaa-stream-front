import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { GenericService, SERVICE_CONFIG } from '../../../../shared/services/generic.service';
import { RegistrationRequest } from '../../../../shared/models/register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule,DialogModule, DropdownModule,ButtonModule, InputTextModule,FileUploadModule,FormsModule,],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  providers:[
    ConfirmationService, MessageService,
      GenericService,
      {
        provide: SERVICE_CONFIG,
        useValue: { resourceEndpoint: 'aggregator/signup' },
      },
  
    
    ]
})
export class CreateUserComponent {
  @Input() visible=false;
  registerRequest:RegistrationRequest={
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    phoneNumber: '',
    gender: undefined,
    email: '',
    userName: ''
  }
  constructor(private router:Router,private genericService:GenericService<string,RegistrationRequest>,private confirmationService: ConfirmationService, private messageService: MessageService){}
  register(){
    console.log('register ')
    this.registerRequest.userName = this.registerRequest.email;
   this.genericService.add(this.registerRequest).
   subscribe({
    next: response => {
      console.log('Registration successful', response);
      this.handleSuccessfulRegistration();
    },
    error: error => {
      console.error('Registration failed', error);
    }
  });
  }
  handleSuccessfulRegistration() {
    console.log('User successfully registered! Redirecting...');
  }
  confirm() {
    this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Please confirm to proceed moving forward.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.register()          
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['users']);
            });  
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }
}
