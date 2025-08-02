import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UraynilaiAstrologyPageRoutingModule } from './uraynilai-astrology-routing.module';

import { UraynilaiAstrologyPage } from './uraynilai-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UraynilaiAstrologyPageRoutingModule
  ],
  declarations: [UraynilaiAstrologyPage]
})
export class UraynilaiAstrologyPageModule {}
