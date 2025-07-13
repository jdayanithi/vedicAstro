import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { LoginComponent } from './pages/login/login.component';
import { CoursesExplorerComponent } from './pages/courses/courses-explorer/courses-explorer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'courses', component: CoursesExplorerComponent, canActivate: [AuthGuard] },
  { 
    path: 'course/:id', 
    loadComponent: () => import('./pages/courses/customer-course-view/customer-course-view.component').then(c => c.CustomerCourseViewComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'topic/:id', 
    loadComponent: () => import('./pages/courses/topic-detail/topic-detail.component').then(c => c.TopicDetailComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'lesson/:id', 
    loadComponent: () => import('./pages/courses/lesson-detail/lesson-detail.component').then(c => c.LessonDetailComponent),
    canActivate: [AuthGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'view-all', component: ViewAllComponent, canActivate: [AuthGuard] },
  { path: 'search-by-name', component: SearchByNameComponent, canActivate: [AuthGuard] },
  { path: 'view-post/:id', component: ViewPostComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
