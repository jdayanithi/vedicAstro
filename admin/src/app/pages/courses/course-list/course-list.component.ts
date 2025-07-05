import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Course Management</h1>
        <button mat-raised-button color="primary" routerLink="add">
          <mat-icon>add</mat-icon>
          Add Course
        </button>
      </div>

      <!-- Filters Card -->
      <mat-card class="filter-card">
        <mat-card-header>
          <mat-card-title>Filters</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="filters">
            <mat-form-field appearance="outline">
              <mat-label>Search courses</mat-label>
              <input matInput 
                     [(ngModel)]="searchQuery" 
                     (input)="applyFilters()"
                     placeholder="Search by title or description...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>            <mat-form-field appearance="outline">
              <mat-label>Difficulty Level</mat-label>
              <mat-select [(ngModel)]="selectedDifficulty" (selectionChange)="applyFilters()">
                <mat-option value="">All</mat-option>
                <mat-option value="beginner">Beginner</mat-option>
                <mat-option value="intermediate">Intermediate</mat-option>
                <mat-option value="advanced">Advanced</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus" (selectionChange)="applyFilters()">
                <mat-option value="">All</mat-option>
                <mat-option value="published">Published</mat-option>
                <mat-option value="draft">Draft</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-icon-button 
                    (click)="clearFilters()" 
                    matTooltip="Clear all filters"
                    [disabled]="!hasActiveFilters()">
              <mat-icon>clear</mat-icon>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading courses...</p>
      </div>

      <!-- Courses Table -->
      <mat-card *ngIf="!loading">
        <mat-card-header>
          <mat-card-title>Courses ({{ filteredCourses.length }})</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="filteredCourses.length === 0" class="no-data">
            <mat-icon>school</mat-icon>
            <h3>No courses found</h3>
            <p *ngIf="hasActiveFilters()">Try adjusting your filters or <button mat-button (click)="clearFilters()">clear all filters</button></p>
            <p *ngIf="!hasActiveFilters()">Start by creating your first course.</p>
          </div>          <table *ngIf="filteredCourses.length > 0" mat-table [dataSource]="pagedCourses" class="full-width">
            <ng-container matColumnDef="thumbnail">
              <th mat-header-cell *matHeaderCellDef>Thumbnail</th>
              <td mat-cell *matCellDef="let course">
                <div class="thumbnail-cell">
                  <img 
                    *ngIf="course.thumbnailUrl; else noThumbnail"
                    [src]="course.thumbnailUrl" 
                    [alt]="course.title + ' thumbnail'"
                    class="course-thumbnail"
                    (error)="onImageError($event)"
                  />
                  <ng-template #noThumbnail>
                    <div class="thumbnail-placeholder">
                      <mat-icon>image</mat-icon>
                    </div>
                  </ng-template>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let course">
                <div class="course-title">
                  <strong>{{ course.title }}</strong>
                  <div class="course-meta">
                    <span class="course-id">ID: {{ course.courseId }}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let course">
                <div class="description-cell" [matTooltip]="course.description">
                  {{ course.description | slice:0:100 }}{{ course.description?.length > 100 ? '...' : '' }}
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let course">
                <div class="price-cell">
                  <strong>{{ course.price | currency:'USD':'symbol':'1.2-2' }}</strong>
                  <div *ngIf="course.durationHours" class="duration">
                    {{ course.durationHours }}h
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="difficultyLevel">
              <th mat-header-cell *matHeaderCellDef>Difficulty</th>
              <td mat-cell *matCellDef="let course">
                <mat-chip 
                  [class]="'difficulty-' + course.difficultyLevel?.toLowerCase()"
                  class="difficulty-chip">
                  {{ course.difficultyLevel }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="isPublished">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let course">
                <mat-chip 
                  [class]="course.isPublished ? 'status-published' : 'status-draft'"
                  class="status-chip">
                  <mat-icon>{{ course.isPublished ? 'check_circle' : 'edit' }}</mat-icon>
                  {{ course.isPublished ? 'Published' : 'Draft' }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let course">
                <div class="action-buttons">
                  <button mat-icon-button 
                          color="primary" 
                          [routerLink]="['update', course.courseId]"
                          matTooltip="Edit course">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button 
                          color="warn" 
                          (click)="deleteCourse(course.courseId, course.title)"
                          matTooltip="Delete course">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns" class="course-row"></tr>
          </table>
        </mat-card-content>
        <mat-paginator
          [length]="filteredCourses.length"
          [pageSize]="pageSize"
          [pageIndex]="pageIndex"
          [pageSizeOptions]="[5, 10, 20]"
          (page)="onPageChange($event)">
        </mat-paginator>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h1 {
        margin: 0;
        color: #333;
        font-size: 28px;
        font-weight: 500;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .filter-card {
      margin-bottom: 20px;
    }

    .filters {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;

      mat-form-field {
        min-width: 200px;
      }
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;

      mat-spinner {
        margin-bottom: 20px;
      }

      p {
        color: #666;
        margin: 0;
      }
    }

    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #666;

      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 20px;
        opacity: 0.5;
      }

      h3 {
        margin: 0 0 12px 0;
        font-weight: 500;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
    }

    .full-width {
      width: 100%;
    }

    .course-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .course-title {
      .course-meta {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
    }    .description-cell {
      max-width: 300px;
      line-height: 1.4;
    }

    .thumbnail-cell {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .course-thumbnail {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0e0e0;
      }
      
      .thumbnail-placeholder {
        width: 50px;
        height: 50px;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        
        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }
    }

    .price-cell {
      .duration {
        font-size: 12px;
        color: #666;
        margin-top: 2px;
      }
    }

    .difficulty-chip {
      font-size: 12px;
      font-weight: 500;
      min-height: 28px;

      &.difficulty-beginner {
        background-color: #e8f5e8;
        color: #2e7d32;
      }

      &.difficulty-intermediate {
        background-color: #fff3e0;
        color: #f57c00;
      }

      &.difficulty-advanced {
        background-color: #ffebee;
        color: #c62828;
      }
    }

    .status-chip {
      font-size: 12px;
      font-weight: 500;
      min-height: 28px;
      display: flex;
      align-items: center;
      gap: 4px;

      &.status-published {
        background-color: #e8f5e8;
        color: #2e7d32;
      }

      &.status-draft {
        background-color: #f5f5f5;
        color: #666;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .action-buttons {
      display: flex;
      gap: 4px;
    }

    // Responsive design
    @media (max-width: 768px) {
      .container {
        padding: 16px;
      }

      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;

        h1 {
          font-size: 24px;
        }
      }

      .filters {
        flex-direction: column;
        align-items: stretch;

        mat-form-field {
          min-width: auto;
          width: 100%;
        }
      }

      .description-cell {
        max-width: 200px;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  loading = false;
  searchQuery = '';
  selectedDifficulty = '';
  selectedStatus = '';
  pageIndex = 0;
  pageSize = 10;

  displayedColumns: string[] = ['thumbnail', 'title', 'description', 'price', 'difficultyLevel', 'isPublished', 'actions'];

  get pagedCourses(): Course[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredCourses.slice(start, start + this.pageSize);
  }

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCourses();
  }  loadCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.snackBar.open('Error loading courses. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }  applyFilters() {
    this.pageIndex = 0;
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchQuery || 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesDifficulty = !this.selectedDifficulty || 
        course.difficultyLevel === this.selectedDifficulty;
      const matchesStatus = !this.selectedStatus || 
        (this.selectedStatus === 'published' && course.isPublished) ||
        (this.selectedStatus === 'draft' && !course.isPublished);
      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedDifficulty = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.searchQuery || this.selectedDifficulty || this.selectedStatus);
  }

  deleteCourse(courseId: number, title: string) {
    if (confirm(`Are you sure you want to delete the course "${title}"? This action cannot be undone.`)) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
          this.snackBar.open('Course deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error deleting course:', error);          this.snackBar.open('Error deleting course. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });        }
      });
    }
  }

  onImageError(event: any) {
    // Hide the broken image and show placeholder instead
    event.target.style.display = 'none';
    const placeholder = event.target.parentElement.querySelector('.thumbnail-placeholder');
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

