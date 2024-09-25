import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DemandService } from '../../../demand/services/demand.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { JwtService } from '../../jwt/jwt.service';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule,
   RouterOutlet,CommonModule, RouterLink,
   SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
 
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = true;
  totalDemands: number = 0;
  fullName='';
  private demandSubscription!: Subscription;
  items: MenuItem[] | undefined;
   role='';

  

  constructor(private accountService:AccountService,private jwtService:JwtService,private demandService: DemandService) {}


  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Profile',
                  icon: 'pi pi-user',
                  url:'profile'
                
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out'
            }
          ]
      }
  ];
  this.role=this.jwtService.getRole() 
  if(this.role=='ADMIN'){
    this.demandSubscription = this.demandService.currentDemandsCount.subscribe(count => {
      this.totalDemands = count;
    });

    this.demandService.getDemands().subscribe(); 
  }
   
  }

  userName=this.jwtService.getUserName();

  getFullName(){
    this.accountService.getStaffByUserName(this.userName).subscribe({
      next:(data)=>{
        this.fullName=data.fullName
      },
      error:(err)=>{


      }
    })
  }
  ngOnDestroy(): void {
    if (this.demandSubscription) {
      this.demandSubscription.unsubscribe();
    }
  }
}
