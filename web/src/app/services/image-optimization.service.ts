import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'webp' | 'jpeg' | 'png';
  progressive?: boolean;
}

export interface OptimizedImage {
  originalFile: File;
  optimizedBlob: Blob;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private readonly DEFAULT_OPTIONS: ImageOptimizationOptions = {
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'webp',
    progressive: true
  };

  /**
   * Check if browser supports WebP format
   */
  async supportsWebP(): Promise<boolean> {
    return new Promise((resolve) => {
      const webp = new Image();
      webp.onload = webp.onerror = () => {
        resolve(webp.height === 2);
      };
      webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Optimize a single image file
   */
  optimizeImage(file: File, options?: ImageOptimizationOptions): Observable<OptimizedImage> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    return from(this.processImage(file, opts)).pipe(
      map(result => result),
      catchError(error => {
        console.error('Image optimization failed:', error);
        throw error;
      })
    );
  }

  /**
   * Optimize multiple images
   */
  optimizeImages(files: File[], options?: ImageOptimizationOptions): Observable<OptimizedImage[]> {
    const optimizationPromises = files.map(file => this.processImage(file, options));
    
    return from(Promise.all(optimizationPromises)).pipe(
      catchError(error => {
        console.error('Batch image optimization failed:', error);
        throw error;
      })
    );
  }

  /**
   * Core image processing logic
   */
  private async processImage(file: File, options?: ImageOptimizationOptions): Promise<OptimizedImage> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    // Check if WebP is supported and adjust format accordingly
    const supportsWebP = await this.supportsWebP();
    if (opts.format === 'webp' && !supportsWebP) {
      opts.format = 'jpeg';
    }

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions
          const { width, height } = this.calculateDimensions(
            img.width, 
            img.height, 
            opts.maxWidth!, 
            opts.maxHeight!
          );

          canvas.width = width;
          canvas.height = height;

          // Draw and compress image
          ctx!.drawImage(img, 0, 0, width, height);

          // Convert to blob with specified quality and format
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to optimize image'));
                return;
              }

              const optimizedImage: OptimizedImage = {
                originalFile: file,
                optimizedBlob: blob,
                originalSize: file.size,
                optimizedSize: blob.size,
                compressionRatio: Math.round((1 - blob.size / file.size) * 100),
                url: URL.createObjectURL(blob)
              };

              resolve(optimizedImage);
            },
            this.getMimeType(opts.format!),
            opts.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Calculate optimal dimensions while maintaining aspect ratio
   */
  private calculateDimensions(
    originalWidth: number, 
    originalHeight: number, 
    maxWidth: number, 
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    let width = originalWidth;
    let height = originalHeight;

    // Scale down if necessary
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return {
      width: Math.round(width),
      height: Math.round(height)
    };
  }

  /**
   * Get MIME type for format
   */
  private getMimeType(format: string): string {
    switch (format) {
      case 'webp':
        return 'image/webp';
      case 'png':
        return 'image/png';
      case 'jpeg':
      default:
        return 'image/jpeg';
    }
  }

  /**
   * Generate responsive image srcset
   */
  generateSrcSet(baseUrl: string, breakpoints: number[] = [320, 640, 768, 1024, 1366, 1920]): string {
    return breakpoints
      .map(width => `${this.addImageParam(baseUrl, 'w', width.toString())} ${width}w`)
      .join(', ');
  }

  /**
   * Add parameter to image URL
   */
  private addImageParam(url: string, param: string, value: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${param}=${value}`;
  }

  /**
   * Create lazy loading intersection observer
   */
  createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void): IntersectionObserver {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });
  }
}
