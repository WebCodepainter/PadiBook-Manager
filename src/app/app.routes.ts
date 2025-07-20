import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookManagementComponent } from './components/book-management/book-management.component';
import { BorrowManagementComponent } from './components/borrow-management/borrow-management.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PenaltyManagementComponent } from './components/penalty-management/penalty-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PublicCatalogComponent } from './components/public-catalog/public-catalog.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalog', component: BookCatalogComponent, canActivate: [AuthGuard] },
  { path: 'book/:id', component: BookDetailsComponent, canActivate: [AuthGuard] },
  { path: 'book-management', component: BookManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'borrow-management', component: BorrowManagementComponent, canActivate: [AuthGuard] },
  { path: 'reservation-management', component: ReservationManagementComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'penalty-management', component: PenaltyManagementComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'public-catalog', component: PublicCatalogComponent },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
