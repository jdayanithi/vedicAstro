import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UraynilaiAstrologyPage } from './uraynilai-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: UraynilaiAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UraynilaiAstrologyPageRoutingModule {}
