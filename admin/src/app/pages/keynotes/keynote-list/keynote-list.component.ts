import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Lesson Keynotes Management</h1>
        <button mat-raised-button color="primary" routerLink="/keynotes/add">
          <mat-icon>add</mat-icon>
          Add Keynote
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Keynotes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Filters -->
          <div class="filters-container">
            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Search keynotes</mat-label>
              <input matInput 
                     [(ngModel)]="searchQuery" 
                     (input)="onSearchChange()"
                     placeholder="Search by title or content...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Filter by Lesson</mat-label>
              <mat-select [(ngModel)]="selectedLessonId" (selectionChange)="onLessonFilterChange()">
                <mat-option value="">All Lessons</mat-option>
                <mat-option *ngFor="let lesson of lessons" [value]="lesson.lessonId">
                  {{lesson.title}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
              <mat-label>Content Type</mat-label>
              <mat-select [(ngModel)]="selectedContentType" (selectionChange)="onContentTypeFilterChange()">
                <mat-option value="">All Types</mat-option>
                <mat-option value="text">Text</mat-option>
                <mat-option value="bullet_points">Bullet Points</mat-option>
                <mat-option value="quote">Quote</mat-option>
                <mat-option value="example">Example</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-stroked-button (click)="showImportantOnly = !showImportantOnly; loadKeynotes()" 
                    [color]="showImportantOnly ? 'primary' : ''">
              <mat-icon>{{showImportantOnly ? 'star' : 'star_border'}}</mat-icon>
              Important Only
            </button>
          </div>

          <!-- Loading -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <!-- Keynotes Table -->
          <div *ngIf="!loading">
            <table mat-table [dataSource]="keynotes" class="full-width">
              <ng-container matColumnDef="order">
                <th mat-header-cell *matHeaderCellDef>Order</th>
                <td mat-cell *matCellDef="let keynote">
                  <span class="order-badge">{{keynote.orderSequence}}</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Title</th>
                <td mat-cell *matCellDef="let keynote">
                  <div class="title-cell">
                    <span class="keynote-title">{{keynote.title}}</span>
                    <mat-icon *ngIf="keynote.isImportant" class="important-icon" color="warn">star</mat-icon>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="lesson">
                <th mat-header-cell *matHeaderCellDef>Lesson</th>
                <td mat-cell *matCellDef="let keynote">
                  <div class="lesson-info">
                    <span class="lesson-title">{{keynote.lessonTitle}}</span>
                    <span class="topic-title" *ngIf="keynote.topicTitle">{{keynote.topicTitle}}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="contentType">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let keynote">
                  <mat-chip class="content-type-chip content-type-{{keynote.contentType}}">
                    {{getContentTypeLabel(keynote.contentType)}}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="content">
                <th mat-header-cell *matHeaderCellDef>Content Preview</th>
                <td mat-cell *matCellDef="let keynote">
                  <div class="content-preview" [matTooltip]="keynote.content">
                    {{keynote.content.length > 100 ? keynote.content.substring(0, 100) + '...' : keynote.content}}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="features">
                <th mat-header-cell *matHeaderCellDef>Features</th>
                <td mat-cell *matCellDef="let keynote">
                  <div class="feature-chips">
                    <mat-chip *ngIf="keynote.hasVisualAid" class="feature-chip visual-aid-chip">
                      <mat-icon>image</mat-icon>
                      Visual Aid
                    </mat-chip>
                    <mat-chip *ngIf="keynote.relatedPlanet" class="feature-chip planet-chip">
                      {{keynote.relatedPlanet}}
                    </mat-chip>
                    <mat-chip *ngIf="keynote.relatedZodiac" class="feature-chip zodiac-chip">
                      {{keynote.relatedZodiac}}
                    </mat-chip>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let keynote">
                  <button mat-icon-button color="primary" 
                          [routerLink]="['/keynotes', keynote.keynoteId]"
                          matTooltip="View Details">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" 
                          (click)="editKeynote(keynote.keynoteId!)"
                          matTooltip="Edit Keynote">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" 
                          (click)="deleteKeynote(keynote)"
                          matTooltip="Delete Keynote">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <!-- No keynotes message -->
            <div *ngIf="keynotes.length === 0" class="no-data">
              <mat-icon>note_alt</mat-icon>
              <p>No keynotes found</p>
              <button mat-raised-button color="primary" routerLink="/keynotes/add">
                Add First Keynote
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header h1 {
      margin: 0;
    }

    .filters-container {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;
      flex-wrap: wrap;
    }

    .filter-field {
      min-width: 200px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .full-width {
      width: 100%;
    }

    .order-badge {
      background-color: #e3f2fd;
      color: #1565c0;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .title-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .keynote-title {
      font-weight: 500;
    }

    .important-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .lesson-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lesson-title {
      font-weight: 500;
      color: #333;
    }

    .topic-title {
      font-size: 12px;
      color: #666;
    }

    .content-type-chip {
      font-size: 11px;
      font-weight: 500;
    }

    .content-type-text {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .content-type-bullet_points {
      background-color: #fff3e0;
      color: #e65100;
    }

    .content-type-quote {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }

    .content-type-example {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .content-preview {
      max-width: 300px;
      line-height: 1.4;
      color: #666;
    }

    .feature-chips {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .feature-chip {
      font-size: 10px;
      height: 24px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .visual-aid-chip {
      background-color: #fff9c4;
      color: #f57f17;
    }

    .planet-chip {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .zodiac-chip {
      background-color: #e1f5fe;
      color: #0277bd;
    }

    .feature-chip mat-icon {
      font-size: 12px;
      width: 12px;
      height: 12px;
    }

    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    .no-data p {
      margin: 16px 0 24px 0;
      font-size: 16px;
    }

    .mat-mdc-cell, .mat-mdc-header-cell {
      padding: 12px 8px;
    }

    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .filters-container {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-field {
        min-width: auto;
        width: 100%;
      }
    }
  `]
})
export class KeynoteListComponent implements OnInit {
  keynotes: LessonKeynote[] = [];
  lessons: any[] = [];
  displayedColumns = ['order', 'title', 'lesson', 'contentType', 'content', 'features', 'actions'];
  loading = false;
  searchQuery = '';
  selectedLessonId = '';
  selectedContentType = '';
  showImportantOnly = false;

  constructor(
    private keynoteService: LessonKeynoteService,
    private lessonService: LessonService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLessons();
    this.loadKeynotes();
  }
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons: any[]) => {
        this.lessons = lessons;
      },
      error: (error: any) => {
        console.error('Error loading lessons:', error);
      }
    });
  }

  loadKeynotes(): void {
    this.loading = true;
    
    if (this.selectedLessonId && this.showImportantOnly) {
      this.keynoteService.getImportantKeynotesByLessonId(+this.selectedLessonId).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else if (this.selectedLessonId) {
      this.keynoteService.getKeynotesByLessonId(+this.selectedLessonId).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else if (this.searchQuery.trim()) {
      this.keynoteService.searchKeynotes(this.searchQuery).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else {
      this.keynoteService.getAllKeynotes().subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    }
  }

  handleKeynotesResponse(keynotes: LessonKeynote[]): void {
    let filteredKeynotes = keynotes;

    if (this.showImportantOnly && !this.selectedLessonId) {
      filteredKeynotes = keynotes.filter(k => k.isImportant);
    }

    if (this.selectedContentType) {
      filteredKeynotes = filteredKeynotes.filter(k => k.contentType === this.selectedContentType);
    }

    this.keynotes = filteredKeynotes;
    this.loading = false;
  }

  handleError(error: any): void {
    console.error('Error loading keynotes:', error);
    this.snackBar.open('Error loading keynotes', 'Close', { duration: 3000 });
    this.loading = false;
  }

  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.selectedLessonId = '';
      this.loadKeynotes();
    } else {
      this.loadKeynotes();
    }
  }

  onLessonFilterChange(): void {
    this.searchQuery = '';
    this.loadKeynotes();
  }

  onContentTypeFilterChange(): void {
    this.loadKeynotes();
  }

  getContentTypeLabel(contentType: string): string {
    switch (contentType) {
      case 'text': return 'Text';
      case 'bullet_points': return 'Bullet Points';
      case 'quote': return 'Quote';
      case 'example': return 'Example';
      default: return contentType;
    }
  }

  editKeynote(id: number): void {
    this.router.navigate(['/keynotes/edit', id]);
  }

  deleteKeynote(keynote: LessonKeynote): void {
    if (confirm(`Are you sure you want to delete the keynote "${keynote.title}"?`)) {
      this.keynoteService.deleteKeynote(keynote.keynoteId!).subscribe({
        next: () => {
          this.snackBar.open('Keynote deleted successfully', 'Close', { duration: 3000 });
          this.loadKeynotes();
        },
        error: (error) => {
          console.error('Error deleting keynote:', error);
          this.snackBar.open('Error deleting keynote', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
