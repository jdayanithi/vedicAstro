import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, switchMap, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { LessonService, Lesson } from '../../../services/lesson.service';
import { TopicService, Topic } from '../../../services/topic.service';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterLink,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Lessons</h1>
        <button mat-raised-button color="primary" routerLink="add" [disabled]="!selectedTopic">
          <mat-icon>add</mat-icon>
          Add Lesson
        </button>
      </div>

      <mat-card class="filter-card">
        <mat-card-content>
          <mat-form-field class="full-width">
            <mat-label>Search Topic</mat-label>
            <input
              type="text"
              matInput
              [formControl]="topicSearchControl"
              [matAutocomplete]="auto"
              placeholder="Type to search topics..."
            />
            <mat-autocomplete
              #auto="matAutocomplete"
              [displayWith]="displayTopicFn"
              (optionSelected)="onTopicSelected($event)"
            >
              <mat-option
                *ngFor="let topic of filteredTopics | async"
                [value]="topic"
              >
                {{ displayTopicFn(topic) }}
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="selectedTopic">
        <mat-card-header>
          <mat-card-title>Lessons for: {{ selectedTopic.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="lessons" class="full-width">
            <ng-container matColumnDef="orderNumber">
              <th mat-header-cell *matHeaderCellDef>Order</th>
              <td mat-cell *matCellDef="let lesson">{{lesson.orderNumber}}</td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let lesson">{{lesson.title}}</td>
            </ng-container>

            <ng-container matColumnDef="contentType">
              <th mat-header-cell *matHeaderCellDef>Content Type</th>
              <td mat-cell *matCellDef="let lesson">
                <span class="content-type-badge" [class]="'content-type-' + lesson.contentType">
                  {{lesson.contentType | titlecase}}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="duration">
              <th mat-header-cell *matHeaderCellDef>Duration</th>
              <td mat-cell *matCellDef="let lesson">
                {{lesson.durationMinutes ? lesson.durationMinutes + ' min' : '-'}}
              </td>
            </ng-container>

            <ng-container matColumnDef="isFree">
              <th mat-header-cell *matHeaderCellDef>Free</th>
              <td mat-cell *matCellDef="let lesson">
                <mat-icon [color]="lesson.isFree ? 'primary' : 'warn'">
                  {{lesson.isFree ? 'check_circle' : 'lock'}}
                </mat-icon>
              </td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let lesson">{{lesson.createdAt | date:'short'}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let lesson">
                <button mat-icon-button color="primary" [routerLink]="['update', lesson.lessonId]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteLesson(lesson.lessonId)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <div *ngIf="lessons.length === 0" class="no-data">
            <p>No lessons found for this topic.</p>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="!selectedTopic" class="placeholder-card">
        <mat-card-content>
          <div class="no-data">
            <mat-icon>play_lesson</mat-icon>
            <p>Please select a topic to view its lessons.</p>
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
    .full-width {
      width: 100%;
    }
    .filter-card {
      margin-bottom: 20px;
    }
    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    .no-data mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }
    .placeholder-card {
      margin-top: 20px;
    }
    .content-type-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .content-type-video {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    .content-type-article {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }
    .content-type-quiz {
      background-color: #fff3e0;
      color: #f57c00;
    }
    .content-type-exercise {
      background-color: #e8f5e8;
      color: #388e3c;
    }
  `]
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[] = [];
  selectedTopic: Topic | null = null;
  topicSearchControl = new FormControl('');
  filteredTopics: Observable<Topic[]> = of([]);
  displayedColumns: string[] = ['orderNumber', 'title', 'contentType', 'duration', 'isFree', 'createdAt', 'actions'];

  constructor(
    private lessonService: LessonService,
    private topicService: TopicService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setupTopicAutocomplete();
  }

  setupTopicAutocomplete() {
    this.filteredTopics = this.topicSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterTopics(value || ''))
    );
  }

  private _filterTopics(value: string | Topic): Observable<Topic[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    if (!value || value.trim() === '') {
      return this.topicService.getAllTopics();
    }
    return this.topicService.getAllTopics();
  }

  displayTopicFn = (topic: Topic): string => {
    return topic ? `${topic.title} (ID: ${topic.topicId})` : '';
  }

  onTopicSelected(event: any) {
    const topic = event.option.value as Topic;
    this.selectedTopic = topic;
    this.loadLessons();
  }

  loadLessons() {
    if (this.selectedTopic) {
      this.lessonService.getLessonsByTopicId(this.selectedTopic.topicId).subscribe({
        next: (lessons) => {
          this.lessons = lessons;
        },
        error: () => {
          this.snackBar.open('Error loading lessons', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  deleteLesson(lessonId: number) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.lessonService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.loadLessons();
          this.snackBar.open('Lesson deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Error deleting lesson', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
