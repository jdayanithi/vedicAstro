import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ImageOptimizationService } from '../../services/image-optimization.service';

@Directive({
  selector: 'img[appOptimizedImage]'
})
export class OptimizedImageDirective implements OnInit, OnDestroy {
  @Input() quality = 80;
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;
  @Input() enableWebP = true;
  @Input() enableLazyLoading = true;

  private observer?: IntersectionObserver;
  private originalSrc?: string;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private imageOptimizationService: ImageOptimizationService
  ) {}

  ngOnInit(): void {
    this.originalSrc = this.el.nativeElement.src;
    
    if (this.enableLazyLoading) {
      this.setupLazyLoading();
    } else {
      this.optimizeImage();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupLazyLoading(): void {
    // Set a placeholder initially
    this.el.nativeElement.src = this.generatePlaceholder();
    
    this.observer = this.imageOptimizationService.createLazyLoadObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.optimizeImage();
          this.observer?.unobserve(entry.target);
        }
      });
    });

    if (this.observer) {
      this.observer.observe(this.el.nativeElement);
    }
  }

  private optimizeImage(): void {
    if (!this.originalSrc) return;

    let optimizedSrc = this.originalSrc;
    
    // Add optimization parameters
    const separator = optimizedSrc.includes('?') ? '&' : '?';
    optimizedSrc += `${separator}q=${this.quality}`;
    
    if (this.maxWidth) optimizedSrc += `&w=${this.maxWidth}`;
    if (this.maxHeight) optimizedSrc += `&h=${this.maxHeight}`;
    
    // Add WebP format if supported and enabled
    if (this.enableWebP) {
      optimizedSrc += '&f=webp';
    }

    this.el.nativeElement.src = optimizedSrc;
    
    // Generate srcset for responsive images
    const srcset = this.imageOptimizationService.generateSrcSet(this.originalSrc);
    if (srcset) {
      this.el.nativeElement.srcset = srcset;
    }

    // Add loading attributes
    this.el.nativeElement.loading = this.enableLazyLoading ? 'lazy' : 'eager';
    this.el.nativeElement.decoding = 'async';
  }

  private generatePlaceholder(): string {
    // Generate a simple data URL placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 1, 1);
    }
    
    return canvas.toDataURL();
  }
}
