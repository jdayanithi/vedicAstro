import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KiragaKarakathuvamPageRoutingModule } from './kiraga-karakathuvam-routing.module';

import { KiragaKarakathuvamPage } from './kiraga-karakathuvam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KiragaKarakathuvamPageRoutingModule
  ],
  declarations: [KiragaKarakathuvamPage]
})
export class KiragaKarakathuvamPageModule {}
