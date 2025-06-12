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
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, switchMap, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { TopicService, Topic } from '../../../services/topic.service';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  selector: 'app-topic-list',
  standalone: true,  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="container">      <div class="header">
        <h1>Topics</h1>
        <button 
          mat-raised-button 
          color="primary" 
          (click)="navigateToAddTopic()" 
          [disabled]="!selectedCourse"
        >
          <mat-icon>add</mat-icon>
          Add Topic
        </button>
      </div>

      <mat-card class="filter-card">
        <mat-card-content>
          <mat-form-field class="full-width">
            <mat-label>Search Course</mat-label>
            <input
              type="text"
              matInput
              [formControl]="courseSearchControl"
              [matAutocomplete]="auto"
              placeholder="Type to search courses..."
            />
            <mat-autocomplete
              #auto="matAutocomplete"
              [displayWith]="displayCourseFn"
              (optionSelected)="onCourseSelected($event)"
            >
              <mat-option
                *ngFor="let course of filteredCourses | async"
                [value]="course"
              >
                {{ displayCourseFn(course) }}
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="selectedCourse">
        <mat-card-header>
          <mat-card-title>Topics for: {{ selectedCourse.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="topics" class="full-width">
            <ng-container matColumnDef="orderNumber">
              <th mat-header-cell *matHeaderCellDef>Order</th>
              <td mat-cell *matCellDef="let topic">{{topic.orderNumber}}</td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let topic">{{topic.title}}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let topic">
                {{topic.description ? (topic.description.length > 100 ? topic.description.substring(0, 100) + '...' : topic.description) : '-'}}
              </td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let topic">{{topic.createdAt | date:'short'}}</td>
            </ng-container>            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let topic">
                <button 
                  mat-icon-button 
                  color="primary" 
                  (click)="navigateToEditTopic(topic.topicId)"
                >
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteTopic(topic.topicId)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <div *ngIf="topics.length === 0" class="no-data">
            <p>No topics found for this course.</p>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card *ngIf="!selectedCourse" class="placeholder-card">
        <mat-card-content>
          <div class="no-data">
            <mat-icon>school</mat-icon>
            <p>Please select a course to view its topics.</p>
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
  `]
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  selectedCourse: Course | null = null;
  courseSearchControl = new FormControl<string | Course>('');
  filteredCourses: Observable<Course[]> = of([]);
  displayedColumns: string[] = ['orderNumber', 'title', 'description', 'createdAt', 'actions'];

  constructor(
    private topicService: TopicService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.setupCourseAutocomplete();
    this.restoreSelectedCourse();
  }

  restoreSelectedCourse() {
    // Check if there's a selected course stored in history state
    const navigationState = history.state;
    if (navigationState && navigationState.selectedCourse) {
      const course = navigationState.selectedCourse as Course;
      this.selectedCourse = course;
      // Set the full course object for the autocomplete to display properly
      this.courseSearchControl.setValue(course);
      this.loadTopics();
    }
  }
  setupCourseAutocomplete() {
    this.filteredCourses = this.courseSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterCourses(value || ''))
    );
  }
  private _filterCourses(value: string | Course): Observable<Course[]> {
    // If value is a Course object, extract the title for filtering
    const filterValue = typeof value === 'string' ? value : value?.title || '';
    
    if (!filterValue || filterValue.trim() === '') {
      return this.courseService.getAllCourses();
    }
    return this.courseService.getAllCourses();
  }
  displayCourseFn = (course: Course): string => {
    if (!course) return '';
    const title = course.title || 'Untitled';
    const id = course.courseId || 'N/A';
    return `${title} (ID: ${id})`;
  }

  onCourseSelected(event: any) {
    const course = event.option.value as Course;
    this.selectedCourse = course;
    this.loadTopics();
  }

  loadTopics() {
    if (this.selectedCourse) {
      this.topicService.getTopicsByCourseId(this.selectedCourse.courseId).subscribe({
        next: (topics) => {
          this.topics = topics;
        },
        error: () => {
          this.snackBar.open('Error loading topics', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  deleteTopic(topicId: number) {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicService.deleteTopic(topicId).subscribe({
        next: () => {
          this.loadTopics();
          this.snackBar.open('Topic deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Error deleting topic', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  navigateToAddTopic() {
    if (this.selectedCourse) {
      this.router.navigate(['topics/add'], { 
        state: { selectedCourse: this.selectedCourse } 
      });
    }
  }

  navigateToEditTopic(topicId: number) {
    this.router.navigate(['topics/update', topicId], { 
      state: { selectedCourse: this.selectedCourse } 
    });
  }
}
