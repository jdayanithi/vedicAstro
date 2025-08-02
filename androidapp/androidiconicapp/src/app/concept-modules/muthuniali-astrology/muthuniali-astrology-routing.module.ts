import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuthunialiAstrologyPage } from './muthuniali-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: MuthunialiAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuthunialiAstrologyPageRoutingModule {}
