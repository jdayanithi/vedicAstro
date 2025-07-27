import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeshaRasiPage } from './mesha-rasi.page';

const routes: Routes = [
  {
    path: '',
    component: MeshaRasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeshaRasiPageRoutingModule {}
