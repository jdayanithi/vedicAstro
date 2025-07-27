import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TantrikPariharamPageRoutingModule } from './tantrik-pariharam-routing.module';

import { TantrikPariharamPage } from './tantrik-pariharam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TantrikPariharamPageRoutingModule
  ],
  declarations: [TantrikPariharamPage]
})
export class TantrikPariharamPageModule {}
