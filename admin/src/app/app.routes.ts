import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.routes').then(m => m.USERS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.routes').then(m => m.CATEGORY_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.routes').then(m => m.COURSES_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/topics/topics.routes').then(m => m.TOPICS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'lessons',
    loadChildren: () => import('./pages/lessons/lessons.routes').then(m => m.LESSONS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'keynotes',
    loadChildren: () => import('./pages/keynotes/keynotes.routes').then(m => m.KEYNOTES_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'tags',
    loadChildren: () => import('./pages/tags/tags.routes').then(m => m.TAGS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.routes').then(m => m.NOTIFICATIONS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.routes').then(m => m.PAYMENT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'images',
    loadChildren: () => import('./pages/images/image-library.module').then(m => m.ImageLibraryModule),
    canActivate: [authGuard]
  },
  {
    path: 'settings/features',
    loadComponent: () => import('./pages/settings/feature-settings.component').then(c => c.FeatureSettingsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
