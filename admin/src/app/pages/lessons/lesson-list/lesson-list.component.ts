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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable, startWith, switchMap, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { LessonService, Lesson } from '../../../services/lesson.service';
import { TopicService, Topic } from '../../../services/topic.service';
import { CourseService, Course } from '../../../services/course.service';
import { CategoryService, Category } from '../../../services/category.service';
import { Component as DialogComponent, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-list',
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
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="container">      <div class="header">
        <h1>Lessons</h1>
        <button 
          mat-raised-button 
          color="primary" 
          (click)="navigateToAddLesson()" 
          [disabled]="!selectedTopic"
        >
          <mat-icon>add</mat-icon>
          Add Lesson
        </button>
      </div>      <mat-card class="filter-card">
        <mat-card-content>
          <div class="filter-row">
            <mat-form-field class="filter-field">
              <mat-label>Filter by Category</mat-label>
              <mat-select [formControl]="categoryControl" (selectionChange)="onCategorySelected($event)">
                <mat-option value="">All Categories</mat-option>
                <mat-option *ngFor="let category of categories" [value]="category.categoryId">
                  {{ category.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field class="filter-field">
              <mat-label>Filter by Course</mat-label>
              <mat-select [formControl]="courseControl" (selectionChange)="onCourseSelected($event)" [disabled]="!categoryControl.value">
                <mat-option value="">All Courses</mat-option>
                <mat-option *ngFor="let course of filteredCourses" [value]="course.courseId">
                  {{ course.title }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

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
      </mat-card>      <mat-card *ngIf="selectedTopic">
        <mat-card-header>
          <mat-card-title>
            Lessons for: {{ selectedTopic.title }}
            <span class="topic-context" *ngIf="selectedCourse && selectedCategory">
              ({{ selectedCourse.title }} - {{ selectedCategory.name }})
            </span>
          </mat-card-title>
        </mat-card-header><mat-card-content>
          <table mat-table [dataSource]="pagedLessons" class="full-width">
            <ng-container matColumnDef="lessonId">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let lesson">{{lesson.lessonId}}</td>
            </ng-container>

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
            </ng-container>            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let lesson">
                <button 
                  mat-icon-button 
                  color="accent" 
                  (click)="viewLessonDetails(lesson)"
                  matTooltip="View Details"
                >
                  <mat-icon>visibility</mat-icon>
                </button>
                <button 
                  mat-icon-button 
                  color="primary" 
                  (click)="navigateToEditLesson(lesson.lessonId)"
                  matTooltip="Edit"
                >
                  <mat-icon>edit</mat-icon>
                </button>
                <button 
                  mat-icon-button 
                  color="warn" 
                  (click)="deleteLesson(lesson.lessonId)"
                  matTooltip="Delete"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <mat-paginator
            [length]="lessons.length"
            [pageSize]="pageSize"
            [pageIndex]="pageIndex"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)">
          </mat-paginator>

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
    }    .filter-card {
      margin-bottom: 20px;
    }
    .filter-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    .filter-field {
      flex: 1;
    }
    .topic-context {
      font-size: 14px;
      color: #666;
      font-weight: normal;
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
  selectedCourse: Course | null = null;
  selectedCategory: Category | null = null;
  
  categories: Category[] = [];
  filteredCourses: Course[] = [];
  allTopics: Topic[] = [];
  
  categoryControl = new FormControl<number | ''>('');
  courseControl = new FormControl<number | ''>('');
  topicSearchControl = new FormControl<string | Topic>('');
  filteredTopics: Observable<Topic[]> = of([]);
  displayedColumns: string[] = ['lessonId', 'orderNumber', 'title', 'contentType', 'duration', 'isFree', 'createdAt', 'actions'];
  pageIndex = 0;
  pageSize = 10;

  get pagedLessons(): Lesson[] {
    const start = this.pageIndex * this.pageSize;
    return this.lessons.slice(start, start + this.pageSize);
  }
  constructor(
    private lessonService: LessonService,
    private topicService: TopicService,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}  ngOnInit() {
    // Load data first, then restore state
    Promise.all([
      this.loadCategoriesAsync(),
      this.loadAllTopicsAsync()
    ]).then(() => {
      this.setupTopicAutocomplete();
      this.restoreSelectedTopic();
    });
  }loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: () => {
        this.snackBar.open('Error loading categories', 'Close', {
          duration: 3000
        });
      }
    });
  }
  loadAllTopics() {
    this.topicService.getAllTopics().subscribe({
      next: (topics: Topic[]) => {
        this.allTopics = topics;
      },
      error: () => {
        this.snackBar.open('Error loading topics', 'Close', {
          duration: 3000
        });
      }
    });
  }

  loadCategoriesAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoryService.getCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          resolve();
        },
        error: (error) => {
          this.snackBar.open('Error loading categories', 'Close', {
            duration: 3000
          });
          reject(error);
        }
      });
    });
  }

  loadAllTopicsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.topicService.getAllTopics().subscribe({
        next: (topics: Topic[]) => {
          this.allTopics = topics;
          resolve();
        },
        error: (error) => {
          this.snackBar.open('Error loading topics', 'Close', {
            duration: 3000
          });
          reject(error);
        }
      });
    });
  }

  onCategorySelected(event: any) {
    const categoryId = event.value;
    this.selectedCategory = categoryId ? this.categories.find(c => c.categoryId === categoryId) || null : null;
    
    // Reset course and topic selections when category changes
    this.courseControl.setValue('');
    this.topicSearchControl.setValue('');
    this.selectedCourse = null;
    this.selectedTopic = null;
    this.lessons = [];
    
    if (categoryId) {
      this.loadCoursesByCategory(categoryId);
    } else {
      this.filteredCourses = [];
    }
  }

  onCourseSelected(event: any) {
    const courseId = event.value;
    this.selectedCourse = courseId ? this.filteredCourses.find(c => c.courseId === courseId) || null : null;
    
    // Reset topic selection when course changes
    this.topicSearchControl.setValue('');
    this.selectedTopic = null;
    this.lessons = [];
    
    // Update topic autocomplete to only show topics from selected course
    this.setupTopicAutocomplete();
  }
  loadCoursesByCategory(categoryId: number) {
    this.courseService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.filteredCourses = courses.filter(course => course.categoryId === categoryId);
      },
      error: () => {
        this.snackBar.open('Error loading courses', 'Close', {
          duration: 3000
        });
      }
    });
  }  restoreSelectedTopic() {
    // Check if there's a selected topic stored in history state
    const navigationState = history.state;
    if (navigationState && navigationState.selectedTopic) {
      const topic = navigationState.selectedTopic as Topic;
      this.selectedTopic = topic;
      
      // Set the topic search control immediately
      this.topicSearchControl.setValue(topic);
      
      // Restore the full context (category, course, topic)
      if (navigationState.selectedCategory) {
        this.selectedCategory = navigationState.selectedCategory;
        if (this.selectedCategory && this.selectedCategory.categoryId) {
          this.categoryControl.setValue(this.selectedCategory.categoryId);
        }
      }
      
      if (navigationState.selectedCourse) {
        this.selectedCourse = navigationState.selectedCourse;
        if (this.selectedCourse) {
          this.loadCoursesByCategory(this.selectedCourse.categoryId);
          // Set the course dropdown immediately since courses are now loaded
          this.courseControl.setValue(this.selectedCourse.courseId);
        }
      } else if (topic.courseId) {
        // Auto-select course if not provided but topic has courseId
        this.courseService.getCourseById(topic.courseId).subscribe({
          next: (course: Course) => {
            this.selectedCourse = course;
            this.courseControl.setValue(course.courseId);
            
            // Auto-select category if not already selected
            if (!this.selectedCategory && course.categoryId) {
              const category = this.categories.find(c => c.categoryId === course.categoryId);
              if (category && category.categoryId) {
                this.selectedCategory = category;
                this.categoryControl.setValue(category.categoryId);
                this.loadCoursesByCategory(category.categoryId);
              }
            }
          }
        });
      }
      
      this.loadLessons();
    }
  }
  setupTopicAutocomplete() {
    this.filteredTopics = this.topicSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterTopics(value || ''))
    );
  }  private _filterTopics(value: string | Topic): Observable<Topic[]> {
    // If value is a Topic object, extract the title for filtering
    const filterValue = typeof value === 'string' ? value : value?.title || '';
    
    if (!filterValue || filterValue.trim() === '') {
      // If no course is selected, show all topics, otherwise filter by course
      if (this.courseControl.value) {
        return of(this.allTopics.filter(topic => topic.courseId === this.courseControl.value));
      }
      return of(this.allTopics);
    }
    
    // Filter topics based on search term and selected course
    let topics = this.allTopics.filter(topic => 
      topic.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    
    if (this.courseControl.value) {
      topics = topics.filter(topic => topic.courseId === this.courseControl.value);
    }    
    return of(topics);
  }
  displayTopicFn = (topic: Topic): string => {
    if (!topic) return '';
    const title = topic.title || 'Untitled';
    const id = topic.topicId || 'N/A';
    
    // Try to find the course name for additional context
    let courseContext = '';
    if (topic.courseId && this.selectedCourse) {
      courseContext = ` - ${this.selectedCourse.title}`;
    }
    
    return `${title} (ID: ${id})${courseContext}`;
  }

  onTopicSelected(event: any) {
    const topic = event.option.value as Topic;
    this.selectedTopic = topic;
    
    // Auto-select the course and category if not already selected
    if (!this.selectedCourse && topic.courseId) {
      this.courseService.getCourseById(topic.courseId).subscribe({
        next: (course: Course) => {
          this.selectedCourse = course;
          this.courseControl.setValue(course.courseId);
          
          // Auto-select category if not already selected
          if (!this.selectedCategory && course.categoryId) {
            const category = this.categories.find(c => c.categoryId === course.categoryId);
            if (category && category.categoryId) {
              this.selectedCategory = category;
              this.categoryControl.setValue(category.categoryId);
              this.loadCoursesByCategory(category.categoryId);
            }
          }
        }
      });
    }
    
    this.loadLessons();
  }
  navigateToAddLesson() {
    if (this.selectedTopic) {
      this.router.navigate(['lessons/add'], { 
        state: { 
          selectedTopic: this.selectedTopic,
          selectedCourse: this.selectedCourse,
          selectedCategory: this.selectedCategory
        } 
      });
    }
  }

  navigateToEditLesson(lessonId: number) {
    this.router.navigate(['lessons/update', lessonId], { 
      state: { 
        selectedTopic: this.selectedTopic,
        selectedCourse: this.selectedCourse,
        selectedCategory: this.selectedCategory
      } 
    });
  }

  loadLessons() {
    if (this.selectedTopic) {
      this.lessonService.getLessonsByTopicId(this.selectedTopic.topicId).subscribe({
        next: (lessons) => {
          this.lessons = lessons.map(lesson => ({
            ...lesson,
            createdAt: parseBackendDate(lesson.createdAt),
            updatedAt: parseBackendDate(lesson.updatedAt)
          }));
          this.pageIndex = 0; // Reset to first page on reload
        },
        error: () => {
          this.snackBar.open('Error loading lessons', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
        }      });
    }
  }

  viewLessonDetails(lesson: Lesson): void {
    this.dialog.open(LessonDetailDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { lesson }
    });
  }
}

// Helper function to parse backend date string
function parseBackendDate(date: any): Date | null {
  if (!date) return null;
  if (date instanceof Date) return date;
  if (typeof date === 'string' && date.includes(',')) {
    // Format: "2025,6,12,14,52,43" (year,month,day,hour,min,sec)
    const parts = date.split(',').map(Number);
    if (parts.length >= 3) {
      // Note: JS months are 0-based
      return new Date(parts[0], parts[1] - 1, parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0);
    }
  }
  // Try native Date parse as fallback
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
}

@DialogComponent({
  selector: 'app-lesson-detail-dialog',
  standalone: true,  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>visibility</mat-icon>
      Lesson Details
    </h2>
    
    <mat-dialog-content class="dialog-content">
      <div class="lesson-info">
        <div class="info-row">
          <strong>ID:</strong> <span class="id-badge">{{data.lesson.lessonId}}</span>
        </div>
        
        <div class="info-row">
          <strong>Title:</strong> {{data.lesson.title}}
        </div>
        
        <div class="info-row">
          <strong>Order:</strong> <span class="order-badge">{{data.lesson.orderNumber}}</span>
        </div>
        
        <div class="info-row">
          <strong>Content Type:</strong> 
          <span class="content-type-badge" [ngClass]="'content-type-' + data.lesson.contentType">
            {{data.lesson.contentType}}
          </span>
        </div>
          <div class="info-row" *ngIf="data.lesson.durationMinutes">
          <strong>Duration:</strong> {{data.lesson.durationMinutes}} minutes
        </div>
        
        <div class="info-row">
          <strong>Free:</strong> 
          <span class="free-badge" [class.is-free]="data.lesson.isFree" [class.is-paid]="!data.lesson.isFree">
            {{data.lesson.isFree ? 'Yes' : 'No'}}
          </span>
        </div>
        
        <div class="info-row" *ngIf="data.lesson.contentUrl">
          <strong>Content URL:</strong> 
          <a [href]="data.lesson.contentUrl" target="_blank" class="content-link">
            {{data.lesson.contentUrl}}
          </a>
        </div>
        
        <div class="info-row" *ngIf="data.lesson.createdAt">
          <strong>Created:</strong> {{parseDate(data.lesson.createdAt) | date:'medium'}}
        </div>
      </div>
      
      <div class="lesson-content" *ngIf="data.lesson.description">
        <h3>Description</h3>        <div class="content-text" [innerHTML]="data.lesson.description"></div>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .lesson-info {
      margin-bottom: 24px;
    }
    
    .info-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 8px;
    }
    
    .info-row strong {
      min-width: 120px;
      color: #333;
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
    
    .order-badge {
      background-color: #fff3e0;
      color: #f57c00;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .content-type-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
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
    
    .free-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .is-free {
      background-color: #e8f5e8;
      color: #2e7d32;
    }
      .is-paid {
      background-color: #fff3e0;
      color: #f57c00;
    }
    
    .content-link {
      color: #1976d2;
      text-decoration: none;
      word-break: break-all;
    }
    
    .content-link:hover {
      text-decoration: underline;
    }
    
    .lesson-content {
      margin-bottom: 24px;
    }
    
    .lesson-content h3 {
      margin-bottom: 12px;
      color: #333;
    }
    
    .content-text {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      border-left: 4px solid #2196f3;      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class LessonDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LessonDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: Lesson }
  ) {}
  
  parseDate(date: any): Date | null {
    return parseBackendDate(date);
  }
}
