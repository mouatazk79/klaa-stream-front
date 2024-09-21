import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Document } from '../../../shared/models/doument';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-document',
  standalone: true,
  imports: [DialogModule, ButtonModule,FormsModule, DropdownModule,InputTextModule],
  templateUrl: './edit-document.component.html',
  styleUrl: './edit-document.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'documents' },
    },
  ]
})
export class EditDocumentComponent implements OnChanges  {

  @Input()visible=false
  @Input()document:Document={
    id:'',
    name: '',
    documentType: undefined,
    documentURL: '',
  }

  modifiedDocument: Document = {
    id: '',
    name: '',
    documentType: undefined,
    documentURL: ''
  };
  constructor(private router:Router,private genericService:GenericService<Document,Document>){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['document'] && this.document) {
      this.modifiedDocument = { ...this.document }; // Update the modifiedDocument when input document changes
    }
  }
  updateDocument(document:Document){

    this.genericService.update(document).subscribe({
      next:()=>{
        console.log('document edited')
      },
      error:()=>{
      
      }
    })
  }

  editDocument(){
    this.updateDocument(this.modifiedDocument);
    this.visible = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['documents']);
    });
  }

  test(){
    console.log(this.document)
    console.log(this.modifiedDocument)
  }

}
