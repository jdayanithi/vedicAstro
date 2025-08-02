import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudhunilaiAstrologyPageRoutingModule } from './mudhunilai-astrology-routing.module';

import { MudhunilaiAstrologyPage } from './mudhunilai-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudhunilaiAstrologyPageRoutingModule
  ],
  declarations: [MudhunilaiAstrologyPage]
})
export class MudhunilaiAstrologyPageModule {}
