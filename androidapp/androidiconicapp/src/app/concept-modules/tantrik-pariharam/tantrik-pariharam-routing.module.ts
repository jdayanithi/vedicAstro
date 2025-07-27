import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TantrikPariharamPage } from './tantrik-pariharam.page';

const routes: Routes = [
  {
    path: '',
    component: TantrikPariharamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TantrikPariharamPageRoutingModule {}
