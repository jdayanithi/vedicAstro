import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RasiKarakathuvamPageRoutingModule } from './rasi-karakathuvam-routing.module';

import { RasiKarakathuvamPage } from './rasi-karakathuvam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RasiKarakathuvamPageRoutingModule
  ],
  declarations: [RasiKarakathuvamPage]
})
export class RasiKarakathuvamPageModule {}
