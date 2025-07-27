import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DnaAstrologyPage } from './dna-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: DnaAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DnaAstrologyPageRoutingModule {}
