import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudakuPariharangalPageRoutingModule } from './mudaku-pariharangal-routing.module';

import { MudakuPariharangalPage } from './mudaku-pariharangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudakuPariharangalPageRoutingModule
  ],
  declarations: [MudakuPariharangalPage]
})
export class MudakuPariharangalPageModule {}
