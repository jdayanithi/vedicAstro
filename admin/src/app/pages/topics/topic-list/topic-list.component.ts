import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
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
import { CategoryService, Category } from '../../../services/category.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    ReactiveFormsModule,
    MatPaginatorModule
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
                <mat-option *ngFor="let course of filteredCoursesList" [value]="course.courseId">
                  {{ course.title }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

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
              (optionSelected)="onCourseSearchSelected($event)"
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
      </mat-card>      <mat-card *ngIf="selectedCourse">
        <mat-card-header>
          <mat-card-title>
            Topics for: {{ selectedCourse.title }}
            <span class="course-context" *ngIf="selectedCategory">
              ({{ selectedCategory.name }})
            </span>
          </mat-card-title>
        </mat-card-header><mat-card-content>
          <table mat-table [dataSource]="pagedTopics" class="full-width">
            <ng-container matColumnDef="topicId">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let topic">{{topic.topicId}}</td>
            </ng-container>

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

          <mat-paginator
            [length]="topics.length"
            [pageSize]="pageSize"
            [pageIndex]="pageIndex"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)">
          </mat-paginator>

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
    .course-context {
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
  `]
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  selectedCourse: Course | null = null;
  selectedCategory: Category | null = null;
  
  categories: Category[] = [];
  filteredCoursesList: Course[] = [];
  allCourses: Course[] = [];
  
  categoryControl = new FormControl<number | ''>('');
  courseControl = new FormControl<number | ''>('');
  courseSearchControl = new FormControl<string | Course>('');
  filteredCourses: Observable<Course[]> = of([]);
  displayedColumns: string[] = ['topicId', 'orderNumber', 'title', 'description', 'createdAt', 'actions'];
  pageIndex = 0;
  pageSize = 10;

  get pagedTopics(): Topic[] {
    const start = this.pageIndex * this.pageSize;
    return this.topics.slice(start, start + this.pageSize);
  }
  constructor(
    private topicService: TopicService,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}  ngOnInit() {
    // Load data first, then restore state
    Promise.all([
      this.loadCategoriesAsync(),
      this.loadAllCoursesAsync()
    ]).then(() => {
      this.setupCourseAutocomplete();
      this.restoreSelectedCourse();
    });
  }
  loadCategories() {
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

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.allCourses = courses;
      },
      error: () => {
        this.snackBar.open('Error loading courses', 'Close', {
          duration: 3000
        });
      }
    });
  }

  loadAllCoursesAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.courseService.getAllCourses().subscribe({
        next: (courses: Course[]) => {
          this.allCourses = courses;
          resolve();
        },
        error: (error) => {
          this.snackBar.open('Error loading courses', 'Close', {
            duration: 3000
          });
          reject(error);
        }
      });
    });
  }

  setupCourseAutocomplete() {
    this.filteredCourses = this.courseSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterCourses(value || ''))
    );
  }  private _filterCourses(value: string | Course): Observable<Course[]> {
    // If value is a Course object, extract the title for filtering
    const filterValue = typeof value === 'string' ? value : value?.title || '';
    
    if (!filterValue || filterValue.trim() === '') {
      // If no category is selected, show all courses, otherwise filter by category
      if (this.categoryControl.value) {
        return of(this.allCourses.filter(course => course.categoryId === this.categoryControl.value));
      }
      return of(this.allCourses);
    }
    
    // Filter courses based on search term and selected category
    let courses = this.allCourses.filter(course => 
      course.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    
    if (this.categoryControl.value) {
      courses = courses.filter(course => course.categoryId === this.categoryControl.value);
    }
    
    return of(courses);
  }  displayCourseFn = (course: Course): string => {
    if (!course) return '';
    const title = course.title || 'Untitled';
    const id = course.courseId || 'N/A';
    
    // Try to find the category name for additional context
    let categoryContext = '';
    if (course.categoryId && this.selectedCategory) {
      categoryContext = ` - ${this.selectedCategory.name}`;
    }
    
    return `${title} (ID: ${id})${categoryContext}`;
  }

  onCategorySelected(event: any) {
    const categoryId = event.value;
    this.selectedCategory = categoryId ? this.categories.find(c => c.categoryId === categoryId) || null : null;
    
    // Reset course and topic selections when category changes
    this.courseControl.setValue('');
    this.courseSearchControl.setValue('');
    this.selectedCourse = null;
    this.topics = [];
    
    if (categoryId) {
      this.loadCoursesByCategory(categoryId);
    } else {
      this.filteredCoursesList = [];
    }
  }

  onCourseSelected(event: any) {
    const courseId = event.value;
    this.selectedCourse = courseId ? this.filteredCoursesList.find(c => c.courseId === courseId) || null : null;
    
    // Reset topic search when course changes from dropdown
    this.courseSearchControl.setValue('');
    this.topics = [];
    
    if (this.selectedCourse) {
      this.loadTopics();
    }
  }

  onCourseSearchSelected(event: any) {
    const course = event.option.value as Course;
    this.selectedCourse = course;
      // Auto-select the category if not already selected
    if (!this.selectedCategory && course.categoryId) {
      const category = this.categories.find(c => c.categoryId === course.categoryId);
      if (category && category.categoryId) {
        this.selectedCategory = category;
        this.categoryControl.setValue(category.categoryId);
        this.loadCoursesByCategory(category.categoryId);
        // Set the course dropdown as well
        setTimeout(() => {
          this.courseControl.setValue(course.courseId);
        }, 100);
      }
    }
    
    this.loadTopics();
  }

  loadCoursesByCategory(categoryId: number) {
    this.filteredCoursesList = this.allCourses.filter(course => course.categoryId === categoryId);
  }  restoreSelectedCourse() {
    // Check if there's a selected course stored in history state
    const navigationState = history.state;
    if (navigationState && navigationState.selectedCourse) {
      const course = navigationState.selectedCourse as Course;
      this.selectedCourse = course;
      
      // Set the course search control immediately
      this.courseSearchControl.setValue(course);
      
      // Restore the full context (category, course)
      if (navigationState.selectedCategory) {
        this.selectedCategory = navigationState.selectedCategory;
        if (this.selectedCategory && this.selectedCategory.categoryId) {
          this.categoryControl.setValue(this.selectedCategory.categoryId);
          this.loadCoursesByCategory(this.selectedCategory.categoryId);
          // Set the course dropdown immediately since courses are now loaded
          this.courseControl.setValue(this.selectedCourse.courseId);
        }
      } else if (course.categoryId) {
        // Auto-select category if not provided but course has categoryId
        const category = this.categories.find(c => c.categoryId === course.categoryId);
        if (category && category.categoryId) {
          this.selectedCategory = category;
          this.categoryControl.setValue(category.categoryId);
          this.loadCoursesByCategory(category.categoryId);
          // Set the course dropdown immediately
          this.courseControl.setValue(course.courseId);
        }
      }
      
      this.loadTopics();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  loadTopics() {
    if (this.selectedCourse) {
      this.topicService.getTopicsByCourseId(this.selectedCourse.courseId).subscribe({
        next: (topics) => {
          this.topics = topics.map(topic => ({
            ...topic,
            createdAt: this.parseCustomDate(topic.createdAt)
          }));
          this.pageIndex = 0; // Reset to first page on reload
        },
        error: () => {
          this.snackBar.open('Error loading topics', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  parseCustomDate(dateStr: any): Date {
    // Handles "2025,6,14,18,3,58" (year,month,day,hour,min,sec)
    if (!dateStr) return new Date(0);
    if (typeof dateStr === 'string') {
      const parts = dateStr.split(',').map(Number);
      if (parts.length === 6) {
        // Note: JS months are 0-based
        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
      }
      // fallback: try Date constructor
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? new Date(0) : d;
    }
    if (dateStr instanceof Date) return dateStr;
    return new Date(0);
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
        state: { 
          selectedCourse: this.selectedCourse,
          selectedCategory: this.selectedCategory
        } 
      });
    }
  }

  navigateToEditTopic(topicId: number) {
    this.router.navigate(['topics/update', topicId], { 
      state: { 
        selectedCourse: this.selectedCourse,
        selectedCategory: this.selectedCategory
      } 
    });
  }
}

