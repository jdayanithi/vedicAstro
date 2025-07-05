import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'landing', 
    component: LandingComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.routes').then(m => m.COURSES_ROUTES)
  },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.routes').then(m => m.POSTS_ROUTES)
  },
  // Legacy redirects for backward compatibility
  { 
    path: 'login', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'create-post', 
    redirectTo: 'posts/create', 
    pathMatch: 'full' 
  },
  { 
    path: 'view-all', 
    redirectTo: 'posts/view-all', 
    pathMatch: 'full' 
  },
  { 
    path: 'search-by-name', 
    redirectTo: 'posts/search', 
    pathMatch: 'full' 
  },
  { 
    path: 'view-post/:id', 
    redirectTo: 'posts/view/:id', 
    pathMatch: 'full' 
  },
  { 
    path: '', 
    redirectTo: 'landing', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'landing' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
