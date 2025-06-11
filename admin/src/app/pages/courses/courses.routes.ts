import { Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CourseListComponent } from './course-list/course-list.component';

export const COURSES_ROUTES: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'add', component: AddCourseComponent },
  { path: 'update/:id', component: UpdateCourseComponent }
];
