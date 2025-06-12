import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap, of } from 'rxjs';
import { TopicService, Topic } from '../../../services/topic.service';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Topic' : 'Add New Topic' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="topicForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Search Course</mat-label>
              <input
                type="text"
                matInput
                formControlName="courseSearch"
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

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Course ID</mat-label>
              <input matInput formControlName="courseId" required readonly />
              <mat-hint>Selected from course search above</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" required />
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="4"></textarea>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width" *ngIf="isEditMode">
              <mat-label>Order Number</mat-label>
              <input matInput type="number" formControlName="orderNumber" min="1" />
            </mat-form-field>

            <div class="button-container">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="topicForm.invalid">
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
  `]
})
export class AddTopicComponent implements OnInit {
  topicForm: FormGroup;
  filteredCourses: Observable<Course[]> = of([]);
  isEditMode = false;
  topicId: number | null = null;

  private fb = inject(FormBuilder);
  private topicService = inject(TopicService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.topicForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      courseId: ['', Validators.required],
      courseSearch: [''],
      orderNumber: [1]
    });
  }
  ngOnInit() {
    this.setupCourseAutocomplete();
    this.checkEditMode();
    this.handleNavigationState();
  }

  handleNavigationState() {
    // Check if we have navigation state with selected course
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state || window.history.state;
    
    if (state && state.selectedCourse && !this.isEditMode) {
      // Pre-populate course from navigation state
      const selectedCourse = state.selectedCourse;
      
      this.topicForm.patchValue({
        courseId: selectedCourse.courseId,
        courseSearch: selectedCourse
      });
    }
  }

  setupCourseAutocomplete() {
    this.filteredCourses = this.topicForm.get('courseSearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterCourses(value))
    );
  }

  private _filterCourses(value: string | Course): Observable<Course[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    if (!value || value.trim() === '') {
      return this.courseService.getAllCourses();
    }
    return this.courseService.getAllCourses();
  }

  displayCourseFn = (course: Course): string => {
    return course ? `${course.title} (ID: ${course.courseId})` : '';
  }

  onCourseSelected(event: any) {
    const course = event.option.value as Course;
    this.topicForm.patchValue({
      courseId: course.courseId
    });
  }

  checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.topicId = +id;
      this.loadTopic();
    }
  }

  loadTopic() {
    if (this.topicId) {
      this.topicService.getTopicById(this.topicId).subscribe({
        next: (topic) => {
          this.topicForm.patchValue({
            title: topic.title,
            description: topic.description,
            courseId: topic.courseId,
            orderNumber: topic.orderNumber
          });
          
          // Load course details for the search field
          this.courseService.getCourseById(topic.courseId).subscribe({
            next: (course) => {
              this.topicForm.patchValue({
                courseSearch: course
              });
            }
          });
        },
        error: () => {
          this.snackBar.open('Error loading topic', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.topicForm.valid) {
      const formData = this.topicForm.value;
      const topicData = {
        title: formData.title,
        description: formData.description,
        courseId: formData.courseId,
        ...(this.isEditMode && { orderNumber: formData.orderNumber })
      };

      if (this.isEditMode && this.topicId) {
        this.topicService.updateTopic(this.topicId, topicData).subscribe({
          next: () => {
            this.snackBar.open('Topic updated successfully', 'Close', {
              duration: 3000
            });
            this.goBack();
          },
          error: () => {
            this.snackBar.open('Error updating topic', 'Close', {
              duration: 3000
            });
          }
        });
      } else {
        this.topicService.createTopic(topicData).subscribe({
          next: () => {
            this.snackBar.open('Topic created successfully', 'Close', {
              duration: 3000
            });
            this.goBack();
          },
          error: () => {
            this.snackBar.open('Error creating topic', 'Close', {
              duration: 3000
            });
          }
        });
      }
    }
  }
  goBack() {
    // Get current course selection to pass back to topic list
    const currentCourseId = this.topicForm.get('courseId')?.value;
    const currentCourse = this.topicForm.get('courseSearch')?.value;
    
    if (currentCourseId && currentCourse) {
      // Navigate back with current course to maintain selection
      this.router.navigate(['/topics'], {
        state: { selectedCourse: currentCourse }
      });
    } else {
      // Navigate back without state if no course selected
      this.router.navigate(['/topics']);
    }
  }
}
