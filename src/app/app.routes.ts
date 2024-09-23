import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { DocumentListComponent } from './document/components/document-list/document-list.component';
import { NotificationListComponent } from './notification/components/notification-list/notification-list.component';
import { StaffListComponent } from './staff/components/staff-list/staff-list.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { CourseListComponent } from './course/components/course-list/course-list.component';
import { CourseDetailsComponent } from './course/components/course-details/course-details.component';
import { DemandListComponent } from './demand/components/demand-list/demand-list.component';
import { VideolistComponent } from './video/components/videolist/videolist.component';
import { EditProfileComponent } from './authentication/components/profile/edit-profile/edit-profile.component';
import { authGuard } from './shared/guard/auth.guard';
import { VideoplayerComponent } from './video/components/videoplayer/videoplayer.component';

const publicRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'videoplayer', component: VideoplayerComponent },

  ];
  const protectedRoutes: Routes = [
    { path: 'courses', component: CourseListComponent },
    { path: 'coursedetails', component: CourseDetailsComponent },
    { path: 'documents', component: DocumentListComponent },
    { path: 'demands', component: DemandListComponent },
    { path: 'staffs', component: StaffListComponent },
    { path: 'users', component: UserListComponent },
    { path: 'notifications', component: NotificationListComponent },
    { path: 'videos', component: VideolistComponent },
    { path: 'profile', component: EditProfileComponent }
  ];
  const guardedRoutes = protectedRoutes.map(route => ({
    ...route,
    canActivate: [authGuard]
  }));
  export const routes: Routes = [
    ...publicRoutes,
    ...guardedRoutes,
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ];