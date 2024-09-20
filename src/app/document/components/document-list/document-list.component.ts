import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Document } from '../../../shared/models/doument';
import { ButtonModule } from 'primeng/button';
import { CreateDocumentComponent } from '../add-document/create-document/create-document.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule, ToastModule, ConfirmPopupModule,CreateDocumentComponent,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule,ButtonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss',
  providers:[ConfirmationService, MessageService,
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'documents' },
    },
  ]
})
export class DocumentListComponent implements OnInit{
  documents: Array<Document> = [];
  constructor(private router:Router, private confirmationService: ConfirmationService, private messageService: MessageService,private genericService: GenericService<Document, Document>
  ) {}

  ngOnInit(): void {
    this.getDocuments()
  }
  getDocuments(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.documents = data.items || [];
        console.log(this.documents)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }
  deleteDocument(id:string){
    this.genericService.remove(id).subscribe(
      {
        next:()=>{
          console.log("document with id: ",id,"deleted")
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }
  

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    confirm(event: Event,id:string) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to delete this record?',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: 'p-button-danger p-button-sm',
          accept: () => { 
              this.deleteDocument(id);      
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['documents']);
              }); 
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
}}
