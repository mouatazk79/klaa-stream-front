import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [DialogModule, DropdownModule,ButtonModule, InputTextModule,FileUploadModule,FormsModule,],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  @Input() visible=false;
  demand = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    phoneNumber: '',
    gender: undefined,
    age: 0
  };
}
