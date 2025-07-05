import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { TagService, Tag } from '../../services/tag.service';
import { TagFormComponent } from './tag-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tags-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <div class="header-content">
              <h2>Manage Tags</h2>
              <button mat-raised-button color="primary" (click)="openTagForm()">
                <mat-icon>add</mat-icon>
                Add New Tag
              </button>
            </div>
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="tags" class="mat-elevation-z2">
              <ng-container matColumnDef="tagName">
                <th mat-header-cell *matHeaderCellDef> Name </th>
                <td mat-cell *matCellDef="let tag"> {{ tag.tagName }} </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef> Description </th>
                <td mat-cell *matCellDef="let tag"> {{ tag.description || '-' }} </td>
              </ng-container>

              <ng-container matColumnDef="statusFlag">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let tag">
                  <mat-slide-toggle 
                    [checked]="tag.statusFlag !== false" 
                    (change)="toggleTagStatus(tag)">
                  </mat-slide-toggle>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let tag">
                  <button mat-icon-button (click)="editTag(tag)" aria-label="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteTag(tag)" aria-label="Delete" color="warn">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .header-content h2 {
      margin: 0;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
    }

    th.mat-header-cell {
      font-weight: 600;
      color: #333;
    }

    .mat-mdc-button .mat-icon {
      margin-right: 8px;
    }
  `]
})
export class TagsPageComponent implements OnInit {
  tags: Tag[] = [];
  displayedColumns: string[] = ['tagName', 'description', 'statusFlag', 'actions'];

  constructor(
    private tagService: TagService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (tags) => this.tags = tags,
      error: (error) => {
        console.error('Error loading tags:', error);
        this.snackBar.open('Error loading tags', 'Close', { duration: 3000 });
      }
    });
  }

  openTagForm(tag?: Tag): void {
    const dialogRef = this.dialog.open(TagFormComponent, {
      width: '500px',
      data: { tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTags();
      }
    });
  }

  editTag(tag: Tag): void {
    this.openTagForm(tag);
  }

  toggleTagStatus(tag: Tag): void {
    const updatedTag = { ...tag, statusFlag: !tag.statusFlag };
    this.tagService.updateTag(tag.tagId!, updatedTag).subscribe({
      next: () => {
        this.snackBar.open(`Tag ${updatedTag.statusFlag ? 'enabled' : 'disabled'}`, 'Close', { duration: 2000 });
        this.loadTags();
      },
      error: (error) => {
        console.error('Error updating tag status:', error);
        this.snackBar.open('Error updating tag status', 'Close', { duration: 3000 });
      }
    });
  }

  deleteTag(tag: Tag): void {
    if (confirm(`Are you sure you want to delete the tag "${tag.tagName}"?`)) {
      this.tagService.deleteTag(tag.tagId!).subscribe({
        next: () => {
          this.snackBar.open('Tag deleted successfully', 'Close', { duration: 3000 });
          this.loadTags();
        },
        error: (error) => {
          console.error('Error deleting tag:', error);
          this.snackBar.open('Error deleting tag', 'Close', { duration: 3000 });
        }
      });
    }
  }
}

