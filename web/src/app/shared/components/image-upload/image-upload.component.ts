import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageOptimizationService, OptimizedImage, ImageOptimizationOptions } from '../../../services/image-optimization.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="image-upload-container">
      <!-- Upload Area -->
      <div 
        class="upload-area"
        [class.drag-over]="isDragOver"
        [class.uploading]="isProcessing"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="triggerFileInput()">
        
        <input 
          #fileInput
          type="file"
          [accept]="acceptedTypes"
          [multiple]="allowMultiple"
          (change)="onFileSelect($event)"
          style="display: none;">
        
        <div class="upload-content" *ngIf="!isProcessing">
          <ion-icon name="cloud-upload-outline" class="upload-icon"></ion-icon>
          <h3 class="upload-title">{{ uploadTitle }}</h3>
          <p class="upload-description">{{ uploadDescription }}</p>
          <ion-button fill="outline" size="small">
            <ion-icon name="folder-open-outline" slot="start"></ion-icon>
            Choose Files
          </ion-button>
        </div>
        
        <div class="processing-content" *ngIf="isProcessing">
          <ion-spinner name="crescent"></ion-spinner>
          <p class="processing-text">Optimizing images...</p>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="processingProgress"></div>
          </div>
        </div>
      </div>
      
      <!-- Optimization Options -->
      <div class="optimization-options" *ngIf="showOptions">
        <h4>Optimization Settings</h4>
        
        <div class="option-group">
          <label>Quality ({{ optimizationOptions.quality! * 100 }}%)</label>
          <ion-range
            [(ngModel)]="optimizationOptions.quality"
            min="0.1"
            max="1"
            step="0.1"
            pin="true">
          </ion-range>
        </div>
        
        <div class="option-group">
          <label>Max Width</label>
          <ion-input
            type="number"
            [(ngModel)]="optimizationOptions.maxWidth"
            placeholder="1920">
          </ion-input>
        </div>
        
        <div class="option-group">
          <label>Max Height</label>
          <ion-input
            type="number"
            [(ngModel)]="optimizationOptions.maxHeight"
            placeholder="1080">
          </ion-input>
        </div>
        
        <div class="option-group">
          <ion-checkbox [(ngModel)]="enableWebP"></ion-checkbox>
          <label>Enable WebP format (when supported)</label>
        </div>
      </div>
      
      <!-- Preview Grid -->
      <div class="preview-grid" *ngIf="optimizedImages.length > 0">
        <h4>Optimized Images</h4>
        
        <div class="image-previews">
          <div 
            class="image-preview" 
            *ngFor="let image of optimizedImages; let i = index">
            
            <div class="preview-image">
              <img [src]="image.url" [alt]="image.originalFile.name">
              <button 
                class="remove-btn"
                (click)="removeImage(i)">
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
            
            <div class="image-info">
              <p class="filename">{{ image.originalFile.name }}</p>
              <div class="size-info">
                <span class="original-size">{{ formatFileSize(image.originalSize) }}</span>
                <ion-icon name="arrow-forward"></ion-icon>
                <span class="optimized-size">{{ formatFileSize(image.optimizedSize) }}</span>
                <span class="compression" [class.good-compression]="image.compressionRatio > 30">
                  (-{{ image.compressionRatio }}%)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="upload-actions">
          <ion-button 
            fill="outline" 
            (click)="clearAll()">
            <ion-icon name="trash-outline" slot="start"></ion-icon>
            Clear All
          </ion-button>
          
          <ion-button 
            fill="solid" 
            color="primary"
            (click)="uploadImages()"
            [disabled]="optimizedImages.length === 0">
            <ion-icon name="cloud-upload-outline" slot="start"></ion-icon>
            Upload {{ optimizedImages.length }} Image{{ optimizedImages.length !== 1 ? 's' : '' }}
          </ion-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent {
  @Input() acceptedTypes = 'image/*';
  @Input() allowMultiple = true;
  @Input() maxFileSize = 10 * 1024 * 1024; // 10MB
  @Input() uploadTitle = 'Upload Images';
  @Input() uploadDescription = 'Drag and drop images here or click to browse';
  @Input() showOptions = true;
  @Input() optimizationOptions: ImageOptimizationOptions = {
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'webp'
  };

  @Output() imagesOptimized = new EventEmitter<OptimizedImage[]>();
  @Output() imagesUploaded = new EventEmitter<OptimizedImage[]>();

  isDragOver = false;
  isProcessing = false;
  processingProgress = 0;
  enableWebP = true;
  optimizedImages: OptimizedImage[] = [];

  constructor(
    private imageOptimizationService: ImageOptimizationService,
    private cdr: ChangeDetectorRef
  ) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = Array.from(event.dataTransfer?.files || []);
    this.processFiles(files);
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    this.processFiles(files);
  }

  private async processFiles(files: File[]): Promise<void> {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= this.maxFileSize
    );

    if (validFiles.length === 0) return;

    this.isProcessing = true;
    this.processingProgress = 0;
    this.cdr.markForCheck();

    try {
      const optimizationOptions = {
        ...this.optimizationOptions,
        format: this.enableWebP ? 'webp' as const : 'jpeg' as const
      };

      const processedImages: OptimizedImage[] = [];
      
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        this.imageOptimizationService.optimizeImage(file, optimizationOptions)
          .subscribe({
            next: (optimizedImage) => {
              processedImages.push(optimizedImage);
              this.processingProgress = ((i + 1) / validFiles.length) * 100;
              this.cdr.markForCheck();
              
              if (processedImages.length === validFiles.length) {
                this.optimizedImages.push(...processedImages);
                this.isProcessing = false;
                this.imagesOptimized.emit(this.optimizedImages);
                this.cdr.markForCheck();
              }
            },
            error: (error) => {
              console.error('Failed to optimize image:', file.name, error);
              this.processingProgress = ((i + 1) / validFiles.length) * 100;
              this.cdr.markForCheck();
            }
          });
      }
    } catch (error) {
      console.error('Image processing failed:', error);
      this.isProcessing = false;
      this.cdr.markForCheck();
    }
  }

  removeImage(index: number): void {
    const removedImage = this.optimizedImages[index];
    URL.revokeObjectURL(removedImage.url);
    this.optimizedImages.splice(index, 1);
    this.cdr.markForCheck();
  }

  clearAll(): void {
    this.optimizedImages.forEach(image => URL.revokeObjectURL(image.url));
    this.optimizedImages = [];
    this.cdr.markForCheck();
  }

  uploadImages(): void {
    if (this.optimizedImages.length > 0) {
      this.imagesUploaded.emit(this.optimizedImages);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
