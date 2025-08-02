import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GayathriManthirangalPage } from './gayathri-manthirangal.page';

const routes: Routes = [
  {
    path: '',
    component: GayathriManthirangalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GayathriManthirangalPageRoutingModule {}
