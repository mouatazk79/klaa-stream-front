import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/components/register/register.component';

export const routes: Routes = [
    {path: 'login' ,component: LoginComponent},
    {path: 'home' ,component: HomeComponent},
    {path: 'register' ,component: RegisterComponent}
];
