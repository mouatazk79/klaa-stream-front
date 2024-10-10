import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { Document } from '../../../../shared/models/doument';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-document',
  standalone: true,
  imports: [ConfirmDialogModule, CheckboxModule,DropdownModule,FormsModule,ToastModule,DialogModule, ButtonModule, InputTextModule,FileUploadModule],
  templateUrl: './create-document.component.html',
  styleUrl: './create-document.component.scss',
  providers:[
    ConfirmationService, MessageService,
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'documents' },
    },
  ]
})
export class CreateDocumentComponent {
  @Input() visible=false;
  @Output() visibleEvent:EventEmitter<boolean>  = new EventEmitter<boolean>();
  document :Document={
    name: '',
    description: '',
    documentType: undefined,
    documentURL: '',
    visible: true
  }
  documentTypes = [
    { label: 'Book', value: 'BOOK' },
    { label: 'Article', value: 'ARTICLE' }
  ];

  constructor(private router:Router,private genericService:GenericService<Document,Document>,private confirmationService: ConfirmationService, private messageService: MessageService){}

  addDocument(){
    this.genericService.add(this.document).subscribe({
      next:(resp)=>{
        console.log("document added successfully",resp)
      },
      error:(err)=>{
        console.log(err)
      }
    })
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
          this.addDocument();          
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['documents']);
            });  
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          this.visible=false
          console.log(this.visible)
          this.visibleEvent.emit(this.visible)
          }
    });
  }

  onCancel() {
    this.reject();
  }
  
  onDialogHide() {
    this.reject();
  }
  
  reject() {
    this.messageService.add({
      severity: 'error',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000
    });
    this.visible = false;
    this.visibleEvent.emit(this.visible);
  }
}
