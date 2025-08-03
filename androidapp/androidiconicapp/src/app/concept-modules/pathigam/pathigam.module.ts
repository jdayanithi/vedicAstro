import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { PathigamPageRoutingModule } from './pathigam-routing.module';
import { PathigamPage } from './pathigam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PathigamPageRoutingModule
  ],
  declarations: [PathigamPage]
})
export class PathigamPageModule {}
