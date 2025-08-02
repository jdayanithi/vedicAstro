import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManthiPariharangalPage } from './manthi-pariharangal.page';

const routes: Routes = [
  {
    path: '',
    component: ManthiPariharangalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManthiPariharangalPageRoutingModule {}
