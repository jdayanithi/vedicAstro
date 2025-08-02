import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManthiPariharangalPageRoutingModule } from './manthi-pariharangal-routing.module';

import { ManthiPariharangalPage } from './manthi-pariharangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManthiPariharangalPageRoutingModule
  ],
  declarations: [ManthiPariharangalPage]
})
export class ManthiPariharangalPageModule {}
