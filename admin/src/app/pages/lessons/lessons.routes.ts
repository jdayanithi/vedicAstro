import { Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';

export const LESSONS_ROUTES: Routes = [
  { path: '', component: LessonListComponent },
  { path: 'add', component: AddLessonComponent },
  { path: 'update/:id', component: AddLessonComponent }
];
