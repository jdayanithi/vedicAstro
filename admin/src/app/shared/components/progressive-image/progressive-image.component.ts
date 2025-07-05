import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ImageOptimizationService } from '../../../services/image-optimization.service';

@Component({
  selector: 'app-progressive-image',
  template: `
    <div class="progressive-image-container" [style.aspect-ratio]="aspectRatio">
      <!-- Placeholder/Blur Image -->
      <img 
        *ngIf="!isLoaded && placeholderSrc"
        [src]="placeholderSrc" 
        [alt]="alt"
        class="placeholder-image"
        loading="eager">
      
      <!-- Main Image -->
      <img 
        #mainImage
        [src]="optimizedSrc" 
        [alt]="alt"
        [sizes]="sizes"
        [srcset]="srcset"
        class="main-image"
        [class.loaded]="isLoaded"
        [class.error]="hasError"
        (load)="onImageLoad()"
        (error)="onImageError($event)"
        [attr.loading]="enableLazyLoading ? 'lazy' : 'eager'"
        decoding="async">
      
      <!-- Loading Spinner -->
      <div *ngIf="!isLoaded && !hasError" class="loading-spinner">
        <mat-spinner diameter="24"></mat-spinner>
      </div>
      
      <!-- Error State -->
      <div *ngIf="hasError" class="error-state">
        <mat-icon>broken_image</mat-icon>
        <span>Failed to load image</span>
      </div>
    </div>
  `,
  styleUrls: ['./progressive-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressiveImageComponent implements OnInit, OnDestroy {
  @Input() src!: string;
  @Input() alt = '';
  @Input() placeholderSrc?: string;
  @Input() aspectRatio = '16/9';
  @Input() sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
  @Input() quality = 80;
  @Input() width?: number;
  @Input() height?: number;
  @Input() enableWebP = true;
  @Input() enableLazyLoading = true;
  @Input() enablePlaceholder = true;

  @ViewChild('mainImage', { static: false }) mainImageRef!: ElementRef<HTMLImageElement>;

  isLoaded = false;
  hasError = false;
  optimizedSrc = '';
  srcset = '';

  private observer?: IntersectionObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    private imageOptimizationService: ImageOptimizationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setupImage();
    
    if (this.enableLazyLoading) {
      this.setupLazyLoading();
    }

    if (this.enablePlaceholder && !this.placeholderSrc) {
      this.placeholderSrc = this.generatePlaceholder();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupImage(): void {
    this.optimizedSrc = this.optimizeImageSrc(this.src);
    this.srcset = this.imageOptimizationService.generateSrcSet(this.src);
  }

  private setupLazyLoading(): void {
    this.observer = this.imageOptimizationService.createLazyLoadObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer?.unobserve(entry.target);
        }
      });
    });

    if (this.observer) {
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  private loadImage(): void {
    if (this.mainImageRef) {
      this.mainImageRef.nativeElement.src = this.optimizedSrc;
    }
  }

  onImageLoad(): void {
    this.isLoaded = true;
    this.cdr.markForCheck();
  }

  onImageError(event: any): void {
    this.hasError = true;
    this.isLoaded = false;
    console.warn('Failed to load image:', this.src, event);
    this.cdr.markForCheck();
  }

  private optimizeImageSrc(src: string): string {
    if (!src) return '';
    
    // Add optimization parameters
    const separator = src.includes('?') ? '&' : '?';
    let optimized = `${src}${separator}q=${this.quality}`;
    
    if (this.width) optimized += `&w=${this.width}`;
    if (this.height) optimized += `&h=${this.height}`;
    
    // Add WebP format if supported and enabled
    if (this.enableWebP) {
      optimized += '&f=webp';
    }
    
    return optimized;
  }

  private generatePlaceholder(): string {
    // Generate a low-quality placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, 20, 20);
      gradient.addColorStop(0, '#f8f9fa');
      gradient.addColorStop(1, '#e9ecef');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 20, 20);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }
}
