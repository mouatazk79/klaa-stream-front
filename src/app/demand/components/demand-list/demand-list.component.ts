import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DemandService } from '../../services/demand.service';
import { Demand } from '../../../shared/models/demand';

@Component({
  selector: 'app-demand-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './demand-list.component.html',
  styleUrl: './demand-list.component.scss'
})
export class DemandListComponent {
  demands: Array<Demand> = [];


  constructor(private demandService:DemandService){ }

   
  ngOnInit(): void {
    this.getDemands()
  }
  getDemands(){
    this.demandService.getDemands().subscribe({
      next:(data)=>{
        this.demands = data || [];
        console.log(this.demands)
      },
      error:(err)=>{
        console.log(err)
      
      }
    })
  }

}
