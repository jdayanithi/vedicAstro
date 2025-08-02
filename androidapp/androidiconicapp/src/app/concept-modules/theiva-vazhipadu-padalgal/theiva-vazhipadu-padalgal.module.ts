import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { TheivaValzipaduPadalgalPageRoutingModule } from './theiva-vazhipadu-padalgal-routing.module';
import { TheivaValzipaduPadalgalPage } from './theiva-vazhipadu-padalgal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TheivaValzipaduPadalgalPageRoutingModule
  ],
  declarations: [TheivaValzipaduPadalgalPage]
})
export class TheivaValzipaduPadalgalPageModule {}
