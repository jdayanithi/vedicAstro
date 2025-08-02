import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RasiKarakathuvamPage } from './rasi-karakathuvam.page';

const routes: Routes = [
  {
    path: '',
    component: RasiKarakathuvamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RasiKarakathuvamPageRoutingModule {}
