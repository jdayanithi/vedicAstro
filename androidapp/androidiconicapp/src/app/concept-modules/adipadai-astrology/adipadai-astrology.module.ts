import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdipadaiAstrologyPageRoutingModule } from './adipadai-astrology-routing.module';

import { AdipadaiAstrologyPage } from './adipadai-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdipadaiAstrologyPageRoutingModule
  ],
  declarations: [AdipadaiAstrologyPage]
})
export class AdipadaiAstrologyPageModule {}
