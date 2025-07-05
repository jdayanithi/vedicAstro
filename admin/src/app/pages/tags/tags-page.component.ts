import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TagService, Tag } from '../../services/tag.service';
import { TagFormComponent } from './tag-form.component';

@Component({
  selector: 'app-tags-page',
  standalone: true,  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  template: `
    <div class="container">
      <mat-card>        <mat-card-header>
          <mat-card-title>
            <div class="header-content">
              <h2>Manage Tags</h2>
              <div class="header-actions">
                <button mat-icon-button color="primary" (click)="loadTags()" 
                        matTooltip="Refresh tags" [disabled]="isLoading">
                  <mat-icon>refresh</mat-icon>
                </button>
                <button mat-raised-button color="primary" (click)="openTagForm()">
                  <mat-icon>add</mat-icon>
                  Add New Tag
                </button>
              </div>
            </div>
          </mat-card-title>
        </mat-card-header>        <mat-card-content>
          <div class="table-container">
            <div *ngIf="isLoading" class="loading-container">
              <mat-spinner diameter="50"></mat-spinner>
              <p>Loading tags...</p>
            </div>
            
            <table *ngIf="!isLoading" mat-table [dataSource]="pagedTags" class="mat-elevation-z2">
              <ng-container matColumnDef="tagName">
                <th mat-header-cell *matHeaderCellDef> Name </th>
                <td mat-cell *matCellDef="let tag"> {{ tag.tagName }} </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef> Description </th>
                <td mat-cell *matCellDef="let tag"> {{ tag.description || '-' }} </td>
              </ng-container>              <ng-container matColumnDef="statusFlag">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let tag">
                  <mat-slide-toggle 
                    [checked]="tag.statusFlag !== false" 
                    (change)="toggleTagStatus(tag, $event)">
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

            <mat-paginator
              [length]="tags.length"
              [pageSize]="pageSize"
              [pageIndex]="pageIndex"
              [pageSizeOptions]="[5, 10, 20]"
              (page)="onPageChange($event)">
            </mat-paginator>

            <div *ngIf="!isLoading && tags.length === 0" class="no-data">
              <mat-icon>local_offer</mat-icon>
              <p>No tags found.</p>
              <button mat-raised-button color="primary" (click)="openTagForm()">
                Create First Tag
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,  styles: [`
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
      color: #333;
    }

    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      margin-top: 20px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
      opacity: 0.6;
    }

    .no-data p {
      margin-bottom: 16px;
      font-size: 16px;
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

    .mat-mdc-table {
      width: 100%;
      background: white;
    }
  `]
})
export class TagsPageComponent implements OnInit {
  tags: Tag[] = [];
  pageIndex = 0;
  pageSize = 10;
  isLoading = false;
  displayedColumns: string[] = ['tagName', 'description', 'statusFlag', 'actions'];

  get pagedTags(): Tag[] {
    const start = this.pageIndex * this.pageSize;
    return this.tags.slice(start, start + this.pageSize);
  }

  constructor(
    private tagService: TagService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }
  loadTags(): void {
    this.isLoading = true;
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.pageIndex = 0; // Reset to first page on reload
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.snackBar.open('Error loading tags', 'Close', { duration: 3000 });
        this.isLoading = false;
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
  }  toggleTagStatus(tag: Tag, event: MatSlideToggleChange): void {
    const newStatus = event.checked;
    const updatedTag = { ...tag, statusFlag: newStatus };
    this.tagService.updateTag(tag.tagId!, updatedTag).subscribe({
      next: () => {
        this.snackBar.open(`Tag ${newStatus ? 'enabled' : 'disabled'}`, 'Close', { duration: 2000 });
        this.loadTags();
      },
      error: (error) => {
        console.error('Error updating tag status:', error);
        this.snackBar.open('Error updating tag status', 'Close', { duration: 3000 });
        // Revert the toggle state on error
        this.loadTags();
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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
