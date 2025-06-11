import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TagService, Tag } from '../../services/tag.service';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <h2>Manage Tags</h2>
      <form [formGroup]="tagForm" (ngSubmit)="onSubmit()" class="tag-form">        <mat-form-field appearance="fill">
          <mat-label>Tag Name</mat-label>
          <input matInput formControlName="tagName" required />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Tag Category</mat-label>
          <input matInput formControlName="tagCategory" />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <input matInput formControlName="description" />
        </mat-form-field>        <button mat-raised-button color="primary" type="submit">
          {{ editMode ? 'Update' : 'Add' }} Tag
        </button>
        <button mat-button type="button" *ngIf="editMode" (click)="cancelEdit()">Cancel</button>
        <button mat-icon-button (click)="loadTags()" aria-label="Refresh">
          <mat-icon>refresh</mat-icon>
        </button>
      </form>
      <table mat-table [dataSource]="tags" class="mat-elevation-z8">        <ng-container matColumnDef="tagName">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let tag"> {{ tag.tagName }} </td>
        </ng-container>
        <ng-container matColumnDef="tagCategory">
          <th mat-header-cell *matHeaderCellDef> Category </th>
          <td mat-cell *matCellDef="let tag"> {{ tag.tagCategory }} </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Description </th>
          <td mat-cell *matCellDef="let tag"> {{ tag.description }} </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let tag">
            <button mat-icon-button color="primary" (click)="editTag(tag)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteTag(tag)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container { max-width: 700px; margin: 0 auto; padding: 24px; }
    .tag-form { display: flex; gap: 16px; margin-bottom: 24px; align-items: flex-end; }
    mat-form-field { flex: 1; }
    table { width: 100%; margin-top: 16px; }
    th.mat-header-cell, td.mat-cell { text-align: left; }
    button[mat-icon-button] { margin-right: 8px; }
  `]
})
export class TagsPageComponent implements OnInit {
  tags: Tag[] = [];
  displayedColumns = ['tagName', 'tagCategory', 'description', 'actions'];
  tagForm: FormGroup;
  editMode = false;
  editingTagId: number | null = null;

  private tagService = inject(TagService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  constructor() {    this.tagForm = this.fb.group({
      tagName: ['', Validators.required],
      tagCategory: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  onSubmit() {
    if (this.tagForm.invalid) return;
    const tag: Tag = this.tagForm.value;
    if (this.editMode && this.editingTagId) {
      this.tagService.updateTag(this.editingTagId, tag).subscribe({
        next: () => {
          this.snackBar.open('Tag updated', 'Close', { duration: 2000 });
          this.loadTags();
          this.cancelEdit();
        },
        error: () => this.snackBar.open('Error updating tag', 'Close', { duration: 3000 })
      });
    } else {
      this.tagService.createTag(tag).subscribe({
        next: () => {
          this.snackBar.open('Tag added', 'Close', { duration: 2000 });
          this.loadTags();
          this.tagForm.reset();
        },
        error: () => this.snackBar.open('Error adding tag', 'Close', { duration: 3000 })
      });
    }
  }
  editTag(tag: Tag) {
    this.editMode = true;
    this.editingTagId = tag.tagId!;
    this.tagForm.patchValue({ 
      tagName: tag.tagName, 
      tagCategory: tag.tagCategory,
      description: tag.description 
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.editingTagId = null;
    this.tagForm.reset();
  }
  deleteTag(tag: Tag) {
    if (confirm(`Delete tag "${tag.tagName}"?`)) {
      this.tagService.deleteTag(tag.tagId!).subscribe({
        next: () => {
          this.snackBar.open('Tag deleted', 'Close', { duration: 2000 });
          this.loadTags();
        },
        error: () => this.snackBar.open('Error deleting tag', 'Close', { duration: 3000 })
      });
    }
  }
}
