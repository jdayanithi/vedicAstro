import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NatchathiramKarakathuvamPage } from './natchathiram-karakathuvam.page';
const routes: Routes = [
  {
    path: '',
    component: NatchathiramKarakathuvamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NatchathiramKarakathuvamPageRoutingModule {}

