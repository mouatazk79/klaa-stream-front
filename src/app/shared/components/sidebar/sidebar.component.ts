import { Component, Input, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
   RouterOutlet,CommonModule, RouterLink,
   SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

//   @ViewChild('sidebarRef') sidebarRef!: Sidebar;
//   closeCallback(e: Event): void {
//     this.sidebarRef.close(e);
// }

sidebarVisible: boolean = true;

@Input() totalDemands:number=0;

}
