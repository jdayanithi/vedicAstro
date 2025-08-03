import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TempleVazhipaduSthalalangalPageRoutingModule } from './temple-vazhipadu-sthalangal-routing.module';

import { TempleVazhipaduSthalalangalPage } from './temple-vazhipadu-sthalangal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TempleVazhipaduSthalalangalPageRoutingModule
  ],
  declarations: [TempleVazhipaduSthalalangalPage]
})
export class TempleVazhipaduSthalalangalPageModule {}
