import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KiragaSerkaiPageRoutingModule } from './kiraga-serkai-routing.module';

import { KiragaSerkaiPage } from './kiraga-serkai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KiragaSerkaiPageRoutingModule
  ],
  declarations: [KiragaSerkaiPage]
})
export class KiragaSerkaiPageModule {}
