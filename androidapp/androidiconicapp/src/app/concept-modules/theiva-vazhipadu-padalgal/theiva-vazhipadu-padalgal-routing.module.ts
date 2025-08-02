import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TheivaValzipaduPadalgalPage } from './theiva-vazhipadu-padalgal.page';

const routes: Routes = [
  {
    path: '',
    component: TheivaValzipaduPadalgalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheivaValzipaduPadalgalPageRoutingModule {}
