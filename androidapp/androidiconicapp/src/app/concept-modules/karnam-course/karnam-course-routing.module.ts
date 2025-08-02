import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KarnamCoursePage } from './karnam-course.page';

const routes: Routes = [
  {
    path: '',
    component: KarnamCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KarnamCoursePageRoutingModule {}
