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
    path: '',
    redirectTo: 'concepts',
    pathMatch: 'full'
  },
  {
    path: 'dna-astrology',
    loadChildren: () => import('./concept-modules/dna-astrology/dna-astrology.module').then( m => m.DnaAstrologyPageModule)
  },
  {
    path: 'tantrik-pariharam',
    loadChildren: () => import('./concept-modules/tantrik-pariharam/tantrik-pariharam.module').then( m => m.TantrikPariharamPageModule)
  },
  {
    path: 'bhava-karathuvam',
    loadChildren: () => import('./concept-modules/bhava-karathuvam/bhava-karathuvam.module').then( m => m.BhavaKarathuvamPageModule)
  },
  {
    path: 'graha-karakathuvam',
    loadChildren: () => import('./concept-modules/graha-karakathuvam/graha-karakathuvam.module').then( m => m.GrahaKarakathuvamPageModule)
  },
  {
    path: 'natchathiram-karakathuvam',
    loadChildren: () => import('./concept-modules/natchathiram-karakathuvam/natchathiram-karakathuvam.module').then( m => m.NatchathiramKarakathuvamPageModule)
  },
  {
    path: 'rasi-karakathuvam',
    loadChildren: () => import('./concept-modules/rasi-karakathuvam/rasi-karakathuvam.module').then( m => m.RasiKarakathuvamPageModule)
  },
  {
    path: 'gayathri-manthirangal',
    loadChildren: () => import('./concept-modules/gayathri-manthirangal/gayathri-manthirangal.module').then( m => m.GayathriManthirangalPageModule)
  },
  {
    path: 'adipadai-astrology',
    loadChildren: () => import('./concept-modules/adipadai-astrology/adipadai-astrology.module').then( m => m.AdipadaiAstrologyPageModule)
  },
  {
    path: 'uyarnilai-astrology',
    loadChildren: () => import('./concept-modules/uyarnilai-astrology/uyarnilai-astrology.module').then( m => m.UyarnilaiAstrologyPageModule)
  },
  {
    path: 'mudhunilai-astrology',
    loadChildren: () => import('./concept-modules/mudhunilai-astrology/mudhunilai-astrology.module').then( m => m.MudhunilaiAstrologyPageModule)
  },
  {
    path: 'karnam-course',
    loadChildren: () => import('./concept-modules/karnam-course/karnam-course.module').then( m => m.KarnamCoursePageModule)
  },
  {
    path: 'thithi-course',
    loadChildren: () => import('./concept-modules/thithi-course/thithi-course.module').then( m => m.ThithiCoursePageModule)
  },
  {
    path: 'namayogam-course',
    loadChildren: () => import('./concept-modules/namayogam-course/namayogam-course.module').then( m => m.NamayogamCoursePageModule)
  },
  {
    path: 'modaku-pariharangal',
    loadChildren: () => import('./concept-modules/modaku-pariharangal/modaku-pariharangal.module').then( m => m.ModakuPariharangalPageModule)
  },
  {
    path: 'maanthi-pariharangal',
    loadChildren: () => import('./concept-modules/maanthi-pariharangal/maanthi-pariharangal.module').then( m => m.MaanthiPariharangalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
