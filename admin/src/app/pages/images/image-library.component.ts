import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ImageLibraryService, ImageLibrary, ImageCategory, PageResponse } from '../../services/image-library.service';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.scss']
})
export class ImageLibraryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('uploadDialog') uploadDialog!: TemplateRef<any>;
  @ViewChild('imageDetailsDialog') imageDetailsDialog!: TemplateRef<any>;
  @ViewChild('imagePreviewDialog') imagePreviewDialog!: TemplateRef<any>;

  displayedColumns: string[] = [
    'select',
    'thumbnail',
    'fileName',
    'title',
    'category',
    'dimensions',
    'fileSize',
    'uploadDate',
    'actions'
  ];

  dataSource = new MatTableDataSource<ImageLibrary>();
  selection = new SelectionModel<ImageLibrary>(true, []);
  
  // Pagination
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 50];

  // Filters
  searchControl = new FormControl('');
  categoryFilter: ImageCategory | null = null;
  lessonFilter: number | null = null;
  topicFilter: number | null = null;
  courseFilter: number | null = null;

  // Categories
  categories = Object.values(ImageCategory);
  
  // Loading states
  isLoading = false;
  isUploading = false;

  // Selected image for details/preview
  selectedImage: ImageLibrary | null = null;

  // Upload
  selectedFiles: File[] = [];
  uploadMetadata: Partial<ImageLibrary> = {
    category: ImageCategory.GENERAL,
    isPublic: true,
    isFeatured: false
  };

  // View mode
  viewMode: 'table' | 'grid' = 'table';

  constructor(
    private imageService: ImageLibraryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImages();
    this.setupSearchFilter();
  }

  setupSearchFilter(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage = 0;
        this.loadImages();
      });
  }

  loadImages(): void {
    this.isLoading = true;
    
    if (this.hasFilters()) {
      this.loadFilteredImages();
    } else {
      this.loadAllImages();
    }
  }

  loadAllImages(): void {
    this.imageService.getAllImages(this.currentPage, this.pageSize, 'uploadDate', 'desc')
      .subscribe({
        next: (response: PageResponse<ImageLibrary>) => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading images:', error);
          if (error.status === 403) {
            this.showError('Access denied. Please ensure you are logged in with admin privileges.');
          } else if (error.status === 401) {
            this.showError('Authentication required. Please log in again.');
          } else {
            this.showError('Failed to load images');
          }
          this.isLoading = false;
        }
      });
  }

  loadFilteredImages(): void {
    const filters = {
      category: this.categoryFilter || undefined,
      lessonId: this.lessonFilter || undefined,
      topicId: this.topicFilter || undefined,
      courseId: this.courseFilter || undefined,
      searchTerm: this.searchControl.value || undefined,
      page: this.currentPage,
      size: this.pageSize
    };

    this.imageService.filterImages(filters)
      .subscribe({
        next: (response: PageResponse<ImageLibrary>) => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error filtering images:', error);
          if (error.status === 403) {
            this.showError('Access denied. Please ensure you are logged in with admin privileges.');
          } else if (error.status === 401) {
            this.showError('Authentication required. Please log in again.');
          } else {
            this.showError('Failed to filter images');
          }
          this.isLoading = false;
        }
      });
  }

  hasFilters(): boolean {
    return !!(
      this.searchControl.value ||
      this.categoryFilter ||
      this.lessonFilter ||
      this.topicFilter ||
      this.courseFilter
    );
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.categoryFilter = null;
    this.lessonFilter = null;
    this.topicFilter = null;
    this.courseFilter = null;
    this.currentPage = 0;
    this.loadImages();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadImages();
  }

  // Selection methods
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // Upload methods
  openUploadDialog(): void {
    this.selectedFiles = [];
    this.uploadMetadata = {
      category: ImageCategory.GENERAL,
      isPublic: true,
      isFeatured: false
    };
    this.dialog.open(this.uploadDialog, {
      width: '600px',
      maxHeight: '90vh'
    });
  }

  onFilesSelected(event: any): void {
    const files = Array.from(event.target.files as FileList);
    this.selectedFiles = files.filter(file => this.imageService.isImageFile(file));
    
    if (this.selectedFiles.length !== files.length) {
      this.showWarning('Some files were filtered out. Only image files are allowed.');
    }
  }

  uploadImages(): void {
    if (this.selectedFiles.length === 0) {
      this.showWarning('Please select at least one image file');
      return;
    }

    this.isUploading = true;

    if (this.selectedFiles.length === 1) {
      // Single file upload
      this.imageService.uploadImage(this.selectedFiles[0], this.uploadMetadata)
        .subscribe({
          next: (result) => {
            this.showSuccess('Image uploaded successfully');
            this.loadImages();
            this.dialog.closeAll();
            this.isUploading = false;
          },
          error: (error) => {
            console.error('Upload error:', error);
            this.showError('Failed to upload image');
            this.isUploading = false;
          }
        });
    } else {
      // Multiple files upload
      this.imageService.uploadMultipleImages(
        this.selectedFiles,
        this.uploadMetadata.category,
        this.uploadMetadata.lesson?.lessonId,
        this.uploadMetadata.topic?.topicId,
        this.uploadMetadata.course?.id,
        'admin'
      ).subscribe({
        next: (results) => {
          this.showSuccess(`${results.length} images uploaded successfully`);
          this.loadImages();
          this.dialog.closeAll();
          this.isUploading = false;
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.showError('Failed to upload images');
          this.isUploading = false;
        }
      });
    }
  }

  // Image actions
  viewImageDetails(image: ImageLibrary): void {
    this.selectedImage = image;
    this.dialog.open(this.imageDetailsDialog, {
      width: '800px',
      maxHeight: '90vh'
    });
  }

  previewImage(image: ImageLibrary): void {
    this.selectedImage = image;
    this.dialog.open(this.imagePreviewDialog, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      panelClass: 'image-preview-dialog'
    });
  }

  editImage(image: ImageLibrary): void {
    // TODO: Implement edit dialog
    console.log('Edit image:', image);
  }

  deleteImage(image: ImageLibrary): void {
    if (confirm(`Are you sure you want to delete "${image.fileName}"?`)) {
      this.imageService.deleteImage(image.imageId!)
        .subscribe({
          next: () => {
            this.showSuccess('Image deleted successfully');
            this.loadImages();
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.showError('Failed to delete image');
          }
        });
    }
  }

  deleteSelectedImages(): void {
    const selectedIds = this.selection.selected.map(img => img.imageId!);
    
    if (selectedIds.length === 0) {
      this.showWarning('Please select images to delete');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected images?`)) {
      this.imageService.deleteMultipleImages(selectedIds)
        .subscribe({
          next: () => {
            this.showSuccess(`${selectedIds.length} images deleted successfully`);
            this.selection.clear();
            this.loadImages();
          },
          error: (error) => {
            console.error('Bulk delete error:', error);
            this.showError('Failed to delete selected images');
          }
        });
    }
  }

  toggleImageFeatured(image: ImageLibrary): void {
    const updatedImage = { ...image, isFeatured: !image.isFeatured };
    
    this.imageService.updateImage(image.imageId!, updatedImage)
      .subscribe({
        next: () => {
          image.isFeatured = !image.isFeatured;
          this.showSuccess(`Image ${image.isFeatured ? 'featured' : 'unfeatured'} successfully`);
        },
        error: (error) => {
          console.error('Update error:', error);
          this.showError('Failed to update image');
        }
      });
  }

  // Utility methods
  getImageUrl(image: ImageLibrary): string {
    return this.imageService.getImageUrl(image.imageId!);
  }

  formatFileSize(bytes: number): string {
    return this.imageService.formatFileSize(bytes);
  }

  getCategoryDisplayName(category: ImageCategory): string {
    return this.imageService.getCategoryDisplayName(category);
  }

  getDimensions(image: ImageLibrary): string {
    if (image.width && image.height) {
      return `${image.width} × ${image.height}`;
    }
    return 'Unknown';
  }

  getFileExtension(filename: string): string {
    return this.imageService.getFileExtension(filename);
  }

  // Notification methods
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['warning-snackbar']
    });
  }

  // View mode toggle
  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'table' ? 'grid' : 'table';
  }

  // Handle image loading errors
  onImageError(event: any): void {
    // Replace broken image with a simple icon or hide it
    const img = event.target;
    img.style.display = 'none';
    
    // Optionally, you could replace with a generic icon
    const parent = img.parentElement;
    if (parent && !parent.querySelector('.broken-image-icon')) {
      const icon = document.createElement('mat-icon');
      icon.className = 'broken-image-icon';
      icon.textContent = 'broken_image';
      icon.style.fontSize = '48px';
      icon.style.color = '#ccc';
      parent.appendChild(icon);
    }
  }
}
