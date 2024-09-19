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

@Component({
  selector: 'app-create-document',
  standalone: true,
  imports: [ConfirmDialogModule, DropdownModule,FormsModule,ToastModule,DialogModule, ButtonModule, InputTextModule,FileUploadModule],
  templateUrl: './create-document.component.html',
  styleUrl: './create-document.component.scss',
  providers:[
    ConfirmationService, MessageService,
    
  ]
})
export class CreateDocumentComponent {
  @Input() visible=false;
  document = {
    name: '',
    Description: '',
    documentType: '',
    documentURL: ''
  };
  documentTypes = [
    { label: 'Book', value: 'BOOK' },
    { label: 'Article', value: 'ARTICLE' }
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
