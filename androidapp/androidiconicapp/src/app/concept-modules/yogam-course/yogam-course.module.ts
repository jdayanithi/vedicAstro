import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YogamCoursePageRoutingModule } from './yogam-course-routing.module';

import { YogamCoursePage } from './yogam-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YogamCoursePageRoutingModule
  ],
  declarations: [YogamCoursePage]
})
export class YogamCoursePageModule {}
