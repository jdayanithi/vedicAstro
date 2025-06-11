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
  },  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.routes').then(m => m.COURSES_ROUTES),
    canActivate: [authGuard]
  },  {
    path: 'topics',
    loadChildren: () => import('./pages/topics/topics.routes').then(m => m.TOPICS_ROUTES),
    canActivate: [authGuard]
  },  {
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
