import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathigamPage } from './pathigam.page';

const routes: Routes = [
  {
    path: '',
    component: PathigamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathigamPageRoutingModule {}
