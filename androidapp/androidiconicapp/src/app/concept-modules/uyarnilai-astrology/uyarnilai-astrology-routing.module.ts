import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UyarnilaiAstrologyPage } from './uyarnilai-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: UyarnilaiAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UyarnilaiAstrologyPageRoutingModule {}
