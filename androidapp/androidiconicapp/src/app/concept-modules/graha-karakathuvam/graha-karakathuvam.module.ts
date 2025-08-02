import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrahaKarakathuvamPageRoutingModule } from './graha-karakathuvam-routing.module';

import { GrahaKarakathuvamPage } from './graha-karakathuvam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrahaKarakathuvamPageRoutingModule
  ],
  declarations: [GrahaKarakathuvamPage]
})
export class GrahaKarakathuvamPageModule {}
