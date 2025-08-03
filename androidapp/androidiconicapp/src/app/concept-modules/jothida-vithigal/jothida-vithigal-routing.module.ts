import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JothidaVithigalPage } from './jothida-vithigal.page';

const routes: Routes = [
  {
    path: '',
    component: JothidaVithigalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JothidaVithigalPageRoutingModule {}
