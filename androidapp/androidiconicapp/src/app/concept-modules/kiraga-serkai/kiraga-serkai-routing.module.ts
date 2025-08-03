import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KiragaSerkaiPage } from './kiraga-serkai.page';

const routes: Routes = [
  {
    path: '',
    component: KiragaSerkaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KiragaSerkaiPageRoutingModule {}
