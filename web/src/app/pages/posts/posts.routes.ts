import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'view-all',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadComponent: () => import('../create-post/create-post.component').then(c => c.CreatePostComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-all',
    loadComponent: () => import('../view-all/view-all.component').then(c => c.ViewAllComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadComponent: () => import('../search-by-name/search-by-name.component').then(c => c.SearchByNameComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:id',
    loadComponent: () => import('../view-post/view-post.component').then(c => c.ViewPostComponent),
    canActivate: [AuthGuard]
  }
];
