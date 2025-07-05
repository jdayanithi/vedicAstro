import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./courses-explorer/courses-explorer.component').then(c => c.CoursesExplorerComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-course/:id',
    loadComponent: () => import('./customer-course-view/customer-course-view.component').then(c => c.CustomerCourseViewComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'topic/:id',
    loadComponent: () => import('./topic-detail/topic-detail.component').then(c => c.TopicDetailComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./lesson-detail/lesson-detail.component').then(c => c.LessonDetailComponent),
    canActivate: [AuthGuard]
  }
];
