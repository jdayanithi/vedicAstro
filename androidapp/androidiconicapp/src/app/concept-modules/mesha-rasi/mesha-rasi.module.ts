import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeshaRasiPageRoutingModule } from './mesha-rasi-routing.module';

import { MeshaRasiPage } from './mesha-rasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeshaRasiPageRoutingModule
  ],
  declarations: [MeshaRasiPage]
})
export class MeshaRasiPageModule {}
