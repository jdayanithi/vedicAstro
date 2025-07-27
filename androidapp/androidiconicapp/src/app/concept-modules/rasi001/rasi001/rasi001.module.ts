import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rasi001PageRoutingModule } from './rasi001-routing.module';

import { Rasi001Page } from './rasi001.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rasi001PageRoutingModule
  ],
  declarations: [Rasi001Page]
})
export class Rasi001PageModule {}
