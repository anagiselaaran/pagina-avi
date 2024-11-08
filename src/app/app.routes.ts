import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
   /*  { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent }, */
    { path: 'access', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'projects', component: ProjectsComponent }
        ] 
    },
    { path: '**', redirectTo: ''}
];
