import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrahaKarakathuvamPage } from './graha-karakathuvam.page';

const routes: Routes = [
  {
    path: '',
    component: GrahaKarakathuvamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrahaKarakathuvamPageRoutingModule {}
