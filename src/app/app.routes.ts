import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

export const routes: Routes = [
    {path: 'login' ,component: LoginComponent},
    {path: 'home' ,component: HomeComponent},
    {path: 'register' ,component: RegisterComponent},
    {path: 'sidebar' ,component: SidebarComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
