import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamayogamCoursePageRoutingModule } from './namayogam-course-routing.module';

import { NamayogamCoursePage } from './namayogam-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NamayogamCoursePageRoutingModule
  ],
  declarations: [NamayogamCoursePage]
})
export class NamayogamCoursePageModule {}
