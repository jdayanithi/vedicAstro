import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NamayogamCoursePage } from './namayogam-course.page';

const routes: Routes = [
  {
    path: '',
    component: NamayogamCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamayogamCoursePageRoutingModule {}
