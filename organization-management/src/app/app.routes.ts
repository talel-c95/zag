import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboardEM/dashboard.component';
import { DashboardRHComponent } from './pages/dashboardRH/dashboardRH.component';
import { HrTasksComponent } from './pages/dashboardRH/hr-tasks.component';
import { HrMeetingsComponent } from './pages/dashboardRH/hr-meetings.component';
import { EstablishmentsComponent } from './pages/dashboardRH/establishments.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardRH', component: DashboardRHComponent },
  { path: 'tasks', component: HrTasksComponent },
  { path: 'meetings', component: HrMeetingsComponent },
  { path: 'establishments', component: EstablishmentsComponent },
  { path: 'calendar', loadComponent: () => import('./pages/dashboardEM/calendar.component').then(m => m.CalendarComponent) },
  { path: 'contact', loadComponent: () => import('./pages/dashboardEM/contact.component').then(m => m.ContactComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
