import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// Import components
import { ProgressiveImageComponent } from './components/progressive-image/progressive-image.component';

@NgModule({
  declarations: [
    ProgressiveImageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    ProgressiveImageComponent
  ]
})
export class SharedModule { }
