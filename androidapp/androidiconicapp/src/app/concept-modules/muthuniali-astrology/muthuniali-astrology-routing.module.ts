import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuthuniliAstrologyPage } from './muthuniali-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: MuthuniliAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuthuniliAstrologyPageRoutingModule {}
