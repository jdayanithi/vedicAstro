import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuthunialiAstrologyPageRoutingModule } from './muthuniali-astrology-routing.module';

import { MuthunialiAstrologyPage } from './muthuniali-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuthunialiAstrologyPageRoutingModule
  ],
  declarations: [MuthunialiAstrologyPage]
})
export class MuthunialiAstrologyPageModule {}
