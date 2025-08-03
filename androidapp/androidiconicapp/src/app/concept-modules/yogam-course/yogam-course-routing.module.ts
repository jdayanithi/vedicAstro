import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YogamCoursePage } from './yogam-course.page';

const routes: Routes = [
  {
    path: '',
    component: YogamCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YogamCoursePageRoutingModule {}
