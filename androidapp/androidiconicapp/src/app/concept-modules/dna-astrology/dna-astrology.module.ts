import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DnaAstrologyPageRoutingModule } from './dna-astrology-routing.module';

import { DnaAstrologyPage } from './dna-astrology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DnaAstrologyPageRoutingModule
  ],
  declarations: [DnaAstrologyPage]
})
export class DnaAstrologyPageModule {}
