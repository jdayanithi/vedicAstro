import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThithiCoursePageRoutingModule } from './thithi-course-routing.module';

import { ThithiCoursePage } from './thithi-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThithiCoursePageRoutingModule
  ],
  declarations: [ThithiCoursePage]
})
export class ThithiCoursePageModule {}
