import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
