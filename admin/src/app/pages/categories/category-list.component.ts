import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form.component';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],  template: `
    <div class="container">
      <div class="header">
        <h1>Categories</h1>
        <button mat-raised-button color="primary" (click)="openCategoryForm()">
          <mat-icon>add</mat-icon>
          Add Category
        </button>
      </div>      <table mat-table [dataSource]="categories" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let category">
            <span class="id-badge">{{category.categoryId}}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="thumbnail">
          <th mat-header-cell *matHeaderCellDef>Thumbnail</th>
          <td mat-cell *matCellDef="let category">
            <div class="thumbnail-cell">
              <img *ngIf="category.thumbnailUrl" 
                   [src]="category.thumbnailUrl" 
                   [alt]="category.name + ' thumbnail'"
                   class="category-thumbnail"
                   (error)="onImageError($event)">
              <div *ngIf="!category.thumbnailUrl" class="no-thumbnail">
                <mat-icon>image</mat-icon>
              </div>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let category">{{category.name}}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let category">{{category.description}}</td>
        </ng-container>

        <ng-container matColumnDef="parentCategory">
          <th mat-header-cell *matHeaderCellDef>Parent Category</th>
          <td mat-cell *matCellDef="let category">{{category.parentCategoryName || '-'}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let category">
            <button mat-icon-button color="primary" (click)="editCategory(category)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteCategory(category)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }    table {
      width: 100%;
    }
    .id-badge {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      font-family: 'Courier New', monospace;
    }
    .thumbnail-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
    }
    .category-thumbnail {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .no-thumbnail {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #999;
    }
  `]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'thumbnail', 'name', 'description', 'parentCategory', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  openCategoryForm(category?: Category) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      data: { category, categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  editCategory(category: Category) {
    this.openCategoryForm(category);
  }

  deleteCategory(category: Category) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(category.categoryId!).subscribe({
        next: () => {
          this.loadCategories();
          this.snackBar.open('Category deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Error deleting category', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onImageError(event: any): void {
    // Replace broken image with placeholder
    event.target.style.display = 'none';
    const parent = event.target.parentNode;
    if (parent && !parent.querySelector('.no-thumbnail')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'no-thumbnail';
      placeholder.innerHTML = '<mat-icon>broken_image</mat-icon>';
      parent.appendChild(placeholder);
    }
  }
}
