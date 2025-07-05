import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TagService, Tag } from '../../services/tag.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],  template: `
    <h2 mat-dialog-title>{{editMode ? 'Edit' : 'Create'}} Tag</h2>
    <mat-dialog-content>
      <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Tag Name</mat-label>
          <input matInput formControlName="tagName" required>
          <mat-error *ngIf="tagForm.get('tagName')?.hasError('required')">
            Tag name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <div class="status-toggle">
          <mat-slide-toggle formControlName="statusFlag">
            Enable Tag
          </mat-slide-toggle>
        </div>

        <div class="button-container">
          <button mat-button type="button" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="tagForm.invalid || isLoading">
            {{isLoading ? 'Saving...' : (editMode ? 'Update' : 'Create')}}
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    
    .status-toggle {
      margin: 16px 0;
    }
    
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    
    mat-dialog-content {
      min-width: 400px;
      max-width: 500px;
    }
  `]
})
export class TagFormComponent {
  tagForm: FormGroup;
  editMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TagFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tag?: Tag }
  ) {
    this.editMode = !!data?.tag;
    this.tagForm = this.createForm();
    
    if (this.editMode && data.tag) {
      this.populateForm(data.tag);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      tagName: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      statusFlag: [true]
    });
  }  private populateForm(tag: Tag): void {
    console.log('Populating form with tag data:', tag);
    this.tagForm.patchValue({
      tagName: tag.tagName,
      description: tag.description || '',
      statusFlag: tag.statusFlag !== undefined ? tag.statusFlag : true
    });
    console.log('Form values after population:', this.tagForm.value);
  }onSubmit(): void {
    if (this.tagForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formValue = this.tagForm.value;
      
      console.log('Form submission - form value:', formValue);
      
      const tagData: Tag = {
        tagName: formValue.tagName,
        description: formValue.description,
        statusFlag: formValue.statusFlag
      };

      console.log('Form submission - tag data being sent:', tagData);

      if (this.editMode && this.data.tag) {
        tagData.tagId = this.data.tag.tagId;
        this.updateTag(tagData);
      } else {
        this.createTag(tagData);
      }
    } else {
      console.log('Form is invalid or loading:', { 
        valid: this.tagForm.valid, 
        loading: this.isLoading,
        formErrors: this.tagForm.errors,
        formValue: this.tagForm.value
      });
    }
  }
  private createTag(tag: Tag): void {
    console.log('Creating tag with data:', tag);
    this.tagService.createTag(tag).subscribe({
      next: (result) => {
        console.log('Tag created successfully:', result);
        this.snackBar.open('Tag created successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error creating tag:', error);
        this.snackBar.open('Error creating tag', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private updateTag(tag: Tag): void {
    console.log('Updating tag with data:', tag);
    this.tagService.updateTag(tag.tagId!, tag).subscribe({
      next: (result) => {
        console.log('Tag updated successfully:', result);
        this.snackBar.open('Tag updated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error updating tag:', error);
        this.snackBar.open('Error updating tag', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}

