import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaanthiPariharangalPageRoutingModule } from './maanthi-pariharangal-routing.module';

import { MaanthiPariharangalPage } from './maanthi-pariharangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaanthiPariharangalPageRoutingModule
  ],
  declarations: [MaanthiPariharangalPage]
})
export class MaanthiPariharangalPageModule {}
