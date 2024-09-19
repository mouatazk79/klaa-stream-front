import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-document',
  standalone: true,
  imports: [DialogModule, DropdownModule,ButtonModule, InputTextModule,FileUploadModule,FormsModule,],
  templateUrl: './create-document.component.html',
  styleUrl: './create-document.component.scss'
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
}
