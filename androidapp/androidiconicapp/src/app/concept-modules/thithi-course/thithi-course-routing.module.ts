import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThithiCoursePage } from './thithi-course.page';

const routes: Routes = [
  {
    path: '',
    component: ThithiCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThithiCoursePageRoutingModule {}
