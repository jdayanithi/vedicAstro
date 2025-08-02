import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModakuPariharangalPageRoutingModule } from './modaku-pariharangal-routing.module';

import { ModakuPariharangalPage } from './modaku-pariharangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModakuPariharangalPageRoutingModule
  ],
  declarations: [ModakuPariharangalPage]
})
export class ModakuPariharangalPageModule {}
