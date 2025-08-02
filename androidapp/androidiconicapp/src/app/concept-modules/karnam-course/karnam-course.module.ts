import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KarnamCoursePageRoutingModule } from './karnam-course-routing.module';

import { KarnamCoursePage } from './karnam-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KarnamCoursePageRoutingModule
  ],
  declarations: [KarnamCoursePage]
})
export class KarnamCoursePageModule {}
