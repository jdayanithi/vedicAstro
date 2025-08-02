import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaanthiPariharangalPage } from './maanthi-pariharangal.page';

const routes: Routes = [
  {
    path: '',
    component: MaanthiPariharangalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaanthiPariharangalPageRoutingModule {}
