import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DocumentListComponent } from './document/components/document-list/document-list.component';
import { NotificationListComponent } from './notification/components/notification-list/notification-list.component';
import { StaffListComponent } from './staff/components/staff-list/staff-list.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { CourseListComponent } from './course/components/course-list/course-list.component';
import { CourseDetailsComponent } from './course/components/course-details/course-details.component';
import { DemandListComponent } from './demand/components/demand-list/demand-list.component';
import { VideolistComponent } from './video/components/videolist/videolist.component';
import { VideoplayerComponent } from './video/components/videoplayer/videoplayer.component';
import { CreatecourseComponent } from './course/components/create-course/createcourse/createcourse.component';
import { EditProfileComponent } from './authentication/components/profile/edit-profile/edit-profile.component';

export const routes: Routes = [
    {path: 'login' ,component: LoginComponent},
    {path: 'home' ,component: HomeComponent},
    {path:'coursedetails',component:CourseDetailsComponent},
    {path: 'courses' ,component: CourseListComponent,
        children:[
            {path:':id',component:CourseDetailsComponent}
        ]
    },
    {path: 'profile' ,component: EditProfileComponent},
    {path: 'demands' ,component: DemandListComponent},
    {path: 'videoplayer' ,component: VideoplayerComponent},
    {path: 'videos' ,component: VideolistComponent},
    {path: 'register' ,component: RegisterComponent},
    {path: 'sidebar' ,component: SidebarComponent},
    {path: 'documets' ,component: DocumentListComponent},
    {path: 'notifications' ,component: NotificationListComponent},
    {path: 'staffs' ,component: StaffListComponent},
    {path: 'users' ,component: UserListComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
