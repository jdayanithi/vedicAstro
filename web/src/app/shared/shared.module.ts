import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Import the module-compatible components
import { ProgressiveImageModuleComponent } from './components/progressive-image/progressive-image-module.component';
import { OptimizedImageDirective } from './directives/optimized-image.directive';

@NgModule({
  declarations: [
    ProgressiveImageModuleComponent,
    OptimizedImageDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ProgressiveImageModuleComponent,
    OptimizedImageDirective
  ]
})
export class SharedModule { }