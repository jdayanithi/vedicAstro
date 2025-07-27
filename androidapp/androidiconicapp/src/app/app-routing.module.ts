import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'concepts',
    loadChildren: () => import('./pages/concepts/concepts.module').then(m => m.ConceptsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'concepts',
    pathMatch: 'full'
  },  {
    path: 'mesha-rasi',
    loadChildren: () => import('./concept-modules/mesha-rasi/mesha-rasi.module').then( m => m.MeshaRasiPageModule)
  },
  {
    path: 'tantrik-pariharam',
    loadChildren: () => import('./concept-modules/tantrik-pariharam/tantrik-pariharam.module').then( m => m.TantrikPariharamPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
