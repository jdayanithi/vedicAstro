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
    path: 'kiraga-karakathuvam',
    loadChildren: () => import('./concept-modules/kiraga-karakathuvam/kiraga-karakathuvam.module').then( m => m.KiragaKarakathuvamPageModule)
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
    path: 'thithi-course',
    loadChildren: () => import('./concept-modules/thithi-course/thithi-course.module').then( m => m.ThithiCoursePageModule)
  },
  {
    path: 'karnam-course',
    loadChildren: () => import('./concept-modules/karnam-course/karnam-course.module').then( m => m.KarnamCoursePageModule)
  },
  {
    path: 'mudaku-pariharangal',
    loadChildren: () => import('./concept-modules/mudaku-pariharangal/mudaku-pariharangal.module').then( m => m.MudakuPariharangalPageModule)
  },
  {
    path: 'mudhunilai-astrology',
    loadChildren: () => import('./concept-modules/mudhunilai-astrology/mudhunilai-astrology.module').then( m => m.MudhunilaiAstrologyPageModule)
  },
  {
    path: 'uyarnilai-astrology',
    loadChildren: () => import('./concept-modules/uyarnilai-astrology/uyarnilai-astrology.module').then( m => m.UyarnilaiAstrologyPageModule)
  },
  {
    path: 'namayogam-course',
    loadChildren: () => import('./concept-modules/namayogam-course/namayogam-course.module').then( m => m.NamayogamCoursePageModule)
  },
  {
    path: 'manthi-pariharangal',
    loadChildren: () => import('./concept-modules/manthi-pariharangal/manthi-pariharangal.module').then( m => m.ManthiPariharangalPageModule)
  },
  {
    path: 'pathigam',
    loadChildren: () => import('./concept-modules/pathigam/pathigam.module').then( m => m.PathigamPageModule)
  },
  {
    path: 'kiraga-serkai',
    loadChildren: () => import('./concept-modules/kiraga-serkai/kiraga-serkai.module').then( m => m.KiragaSerkaiPageModule)
  },
  {
    path: 'yogam-course',
    loadChildren: () => import('./concept-modules/yogam-course/yogam-course.module').then( m => m.YogamCoursePageModule)
  },
  {
    path: 'temple-vazhipadu-sthalangal',
    loadChildren: () => import('./concept-modules/temple-vazhipadu-sthalangal/temple-vazhipadu-sthalangal.module').then( m => m.TempleVazhipaduSthalalangalPageModule)
  },
  {
    path: 'jothida-vithigal',
    loadChildren: () => import('./concept-modules/jothida-vithigal/jothida-vithigal.module').then( m => m.JothidaVithigalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
