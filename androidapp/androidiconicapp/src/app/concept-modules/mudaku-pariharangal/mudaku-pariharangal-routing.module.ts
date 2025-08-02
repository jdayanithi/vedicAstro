import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudakuPariharangalPage } from './mudaku-pariharangal.page';

const routes: Routes = [
  {
    path: '',
    component: MudakuPariharangalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MudakuPariharangalPageRoutingModule {}
