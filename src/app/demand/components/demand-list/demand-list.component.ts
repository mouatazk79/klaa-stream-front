import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DemandService } from '../../services/demand.service';
import { Demand } from '../../../shared/models/demand';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-demand-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule, ToastModule, ConfirmPopupModule,ButtonModule,SidebarComponent,TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './demand-list.component.html',
  styleUrl: './demand-list.component.scss',
  providers: [ConfirmationService, MessageService
    ,
  ]

})
export class DemandListComponent {

  demands: Array<Demand> = [];


  constructor(private accountService:AccountService,private router:Router,private confirmationService: ConfirmationService, private messageService: MessageService,private demandService:DemandService){ }

   
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

  activateAccount(userName:string){
    this.accountService.activate(userName).subscribe({
      next:()=>{
        console.log('activated')
      },
      error:()=>{
      
      }
    })
  }
  activate(event: Event,userName:string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.activateAccount(userName);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['demands']);
            });

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}


}
