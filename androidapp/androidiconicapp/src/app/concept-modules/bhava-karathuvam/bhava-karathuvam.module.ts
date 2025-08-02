import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhavaKarathuvamPageRoutingModule } from './bhava-karathuvam-routing.module';

import { BhavaKarathuvamPage } from './bhava-karathuvam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhavaKarathuvamPageRoutingModule
  ],
  declarations: [BhavaKarathuvamPage]
})
export class BhavaKarathuvamPageModule {}
