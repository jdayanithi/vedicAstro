import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdipadaiAstrologyPage } from './adipadai-astrology.page';

const routes: Routes = [
  {
    path: '',
    component: AdipadaiAstrologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdipadaiAstrologyPageRoutingModule {}
