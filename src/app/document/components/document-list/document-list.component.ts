import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { GenericService, SERVICE_CONFIG } from '../../../shared/services/generic.service';
import { Document } from '../../../shared/models/doument';
@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss',
  providers:[
    GenericService,
    {
      provide: SERVICE_CONFIG,
      useValue: { resourceEndpoint: 'documents' },
    },
  ]
})
export class DocumentListComponent implements OnInit{
  documents: Array<Document> = [];
  constructor( private genericService: GenericService<Document, Document>
  ) {}

  ngOnInit(): void {
    this.getDocuments()
  }
  getDocuments(){
    this.genericService.getList().subscribe({
      next:(data)=>{
        this.documents = data.items || [];
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }
  

}
