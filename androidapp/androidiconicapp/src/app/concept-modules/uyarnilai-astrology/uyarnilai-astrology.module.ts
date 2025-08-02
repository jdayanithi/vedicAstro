import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UyarnilaiAstrologyPageRoutingModule } from './uyarnilai-astrology-routing.module';

import { UyarnilaiAstrologyPage } from './uyarnilai-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UyarnilaiAstrologyPageRoutingModule
  ],
  declarations: [UyarnilaiAstrologyPage]
})
export class UyarnilaiAstrologyPageModule {}
