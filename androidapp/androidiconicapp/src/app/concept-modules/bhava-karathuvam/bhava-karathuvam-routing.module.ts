import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhavaKarathuvamPage } from './bhava-karathuvam.page';

const routes: Routes = [
  {
    path: '',
    component: BhavaKarathuvamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhavaKarathuvamPageRoutingModule {}
