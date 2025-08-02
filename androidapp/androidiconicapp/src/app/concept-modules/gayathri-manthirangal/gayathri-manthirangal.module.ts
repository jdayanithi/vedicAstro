import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GayathriManthirangalPageRoutingModule } from './gayathri-manthirangal-routing.module';

import { GayathriManthirangalPage } from './gayathri-manthirangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GayathriManthirangalPageRoutingModule
  ],
  declarations: [GayathriManthirangalPage]
})
export class GayathriManthirangalPageModule {}
