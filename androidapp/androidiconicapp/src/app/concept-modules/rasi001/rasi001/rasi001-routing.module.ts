import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rasi001Page } from './rasi001.page';

const routes: Routes = [
  {
    path: '',
    component: Rasi001Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rasi001PageRoutingModule {}
