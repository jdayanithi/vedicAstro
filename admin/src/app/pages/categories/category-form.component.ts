import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{editMode ? 'Edit' : 'Create'}} Category</h2>
    <mat-dialog-content>
      <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="categoryForm.get('name')?.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Parent Category</mat-label>
          <mat-select formControlName="parentCategoryId">
            <mat-option [value]="null">None</mat-option>
            <mat-option *ngFor="let category of availableParentCategories" 
                      [value]="category.categoryId">
              {{category.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="button-container">
          <button mat-button type="button" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="categoryForm.invalid">
            {{editMode ? 'Update' : 'Create'}}
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  
  `]
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  editMode: boolean = false;
  availableParentCategories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category?: Category; categories: Category[] }
  ) {
    this.editMode = !!data.category;
    this.availableParentCategories = data.categories.filter(c => 
      !this.editMode || c.categoryId !== data.category?.categoryId
    );

    this.categoryForm = this.fb.group({
      name: [data.category?.name || '', Validators.required],
      description: [data.category?.description || ''],
      parentCategoryId: [data.category?.parentCategoryId || null]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      
      if (this.editMode) {
        this.categoryService.updateCategory(this.data.category!.categoryId!, categoryData)
          .subscribe({
            next: () => {
              this.snackBar.open('Category updated successfully', 'Close', {
                duration: 3000
              });
              this.dialogRef.close(true);
            },
            error: () => {
              this.snackBar.open('Error updating category', 'Close', {
                duration: 3000
              });
            }
          });
      } else {
        this.categoryService.createCategory(categoryData)
          .subscribe({
            next: () => {
              this.snackBar.open('Category created successfully', 'Close', {
                duration: 3000
              });
              this.dialogRef.close(true);
            },
            error: () => {
              this.snackBar.open('Error creating category', 'Close', {
                duration: 3000
              });
            }
          });
      }
    }
  }
}
