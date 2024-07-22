import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DocumentListComponent } from './document/components/document-list/document-list.component';
import { NotificationListComponent } from './notification/components/notification-list/notification-list.component';
import { StaffListComponent } from './staff/components/staff-list/staff-list.component';
import { UserListComponent } from './user/components/user-list/user-list.component';

export const routes: Routes = [
    {path: 'login' ,component: LoginComponent},
    {path: 'home' ,component: HomeComponent},
    {path: 'register' ,component: RegisterComponent},
    {path: 'sidebar' ,component: SidebarComponent},
    {path: 'documets' ,component: DocumentListComponent},
    {path: 'notifications' ,component: NotificationListComponent},
    {path: 'staffs' ,component: StaffListComponent},
    {path: 'users' ,component: UserListComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
