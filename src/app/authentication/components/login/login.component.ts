import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,DividerModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
