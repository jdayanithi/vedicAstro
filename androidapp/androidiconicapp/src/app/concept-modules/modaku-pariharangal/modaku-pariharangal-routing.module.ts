import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModakuPariharangalPage } from './modaku-pariharangal.page';

const routes: Routes = [
  {
    path: '',
    component: ModakuPariharangalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModakuPariharangalPageRoutingModule {}
