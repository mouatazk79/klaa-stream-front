import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DemandService } from '../../../demand/services/demand.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule,
   RouterOutlet,CommonModule, RouterLink,
   SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = true;
  totalDemands: number = 0;
  private demandSubscription!: Subscription;
  items: MenuItem[] | undefined;

  constructor(private demandService: DemandService) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Profile',
                  icon: 'pi pi-user'
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out'
            }
          ]
      }
  ];
    this.demandSubscription = this.demandService.currentDemandsCount.subscribe(count => {
      this.totalDemands = count;
    });

    this.demandService.getDemands().subscribe();  
  }

  ngOnDestroy(): void {
    if (this.demandSubscription) {
      this.demandSubscription.unsubscribe();
    }
  }
}
