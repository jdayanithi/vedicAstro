import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudhunilaiAstrologyPage } from './mudhunilai-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: MudhunilaiAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MudhunilaiAstrologyPageRoutingModule {}
