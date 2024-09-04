import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink,  RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationRequest } from '../../../shared/models/authentication-request';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,DividerModule, ButtonModule, InputTextModule,FormsModule],
  providers:[AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest:AuthenticationRequest={
    email: '',
    password: ''
  }
  constructor(private router:Router,private authenticationService:AuthenticationService){  }
 
  authenticate(){
    this.authenticationService
    .login(this.authRequest)
    .subscribe({
      next:(authenticationResponse)=>{
        localStorage.setItem('Authorization',JSON.stringify(authenticationResponse))
        console.log(localStorage.getItem('Authorization'))
        this.router.navigate(['courses']);
      },
      error: (err) => {
        console.log('errrrrr'+err)
       
    }})
    console.log(this.authRequest)
  }

}
