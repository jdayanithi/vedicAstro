import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuthuniliAstrologyPageRoutingModule } from './muthuniali-astrology-routing.module';

import { MuthuniliAstrologyPage } from './muthuniali-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuthuniliAstrologyPageRoutingModule
  ],
  declarations: [MuthuniliAstrologyPage]
})
export class MuthuniliAstrologyPageModule {}
