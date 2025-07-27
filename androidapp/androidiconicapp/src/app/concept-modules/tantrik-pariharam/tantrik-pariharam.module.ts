import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { TantrikPariharamPageRoutingModule } from './tantrik-pariharam-routing.module';

import { TantrikPariharamPage } from './tantrik-pariharam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    TantrikPariharamPageRoutingModule
  ],
  declarations: [TantrikPariharamPage]
})
export class TantrikPariharamPageModule {}
