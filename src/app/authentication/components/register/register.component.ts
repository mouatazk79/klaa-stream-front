import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { RegistrationRequest } from '../../../shared/models/register-request';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,DropdownModule,DividerModule, ButtonModule, InputTextModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'aggregator/signup' },
    },

  ]
})
export class RegisterComponent {

  registerRequest:RegistrationRequest={
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    phoneNumber: '',
    gender: undefined,
    email: ''
  }
  constructor(private genericService:GenericService<string,RegistrationRequest>){}

  register(){
    console.log('register ')
   this.genericService.add(this.registerRequest).subscribe({
    next: response => {
      console.log('Registration successful', response);
    },
    error: error => {
      console.error('Registration failed', error);
    }
  });
  }

}
