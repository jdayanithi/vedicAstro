import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap, of } from 'rxjs';
import { CourseService, Course } from '../../../services/course.service';
import { UserService, User } from '../../../services/users.service';
import { CategoryService, Category } from '../../../services/category.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class UpdateCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number;
  loading = false;
  submitting = false;
  filteredUsers: Observable<User[]> = of([]);
  filteredCategories: Observable<Category[]> = of([]);
  
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private userService = inject(UserService);
  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      loginId: ['', Validators.required],
      userSearch: [''],
      categoryId: [''],
      categorySearch: [''],
      difficultyLevel: ['BEGINNER', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      durationHours: ['', Validators.min(0)],
      thumbnailUrl: [''],
      isPublished: [false]
    });

    this.courseId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadCourse();
    this.setupAutocomplete();
  }

  private loadCourse() {
    this.loading = true;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          loginId: course.loginId,
          categoryId: course.categoryId,
          difficultyLevel: course.difficultyLevel,
          price: course.price,
          durationHours: course.durationHours,
          thumbnailUrl: course.thumbnailUrl,
          isPublished: course.isPublished
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.snackBar.open('Error loading course data', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  private setupAutocomplete() {
    // Setup autocomplete for user search
    this.filteredUsers = this.courseForm.get('userSearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterUsers(value))
    );

    // Setup autocomplete for category search
    this.filteredCategories = this.courseForm.get('categorySearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterCategories(value))
    );
  }

  private _filterUsers(value: string | User): Observable<User[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    const filterValue = value.trim().toLowerCase();
    if (!filterValue) {
      return of([]);
    }
    return this.userService.searchUsers(filterValue);
  }

  private _filterCategories(value: string): Observable<Category[]> {
    return this.categoryService.getCategories().pipe(
      map(categories => {
        const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        return categories.filter(category => 
          category.name.toLowerCase().includes(filterValue)
        );
      })
    );
  }

  displayFn = (user: User): string => {
    return user ? `${user.firstName} ${user.lastName} (${user.username})` : '';
  }

  displayCategoryFn = (category: Category): string => {
    return category ? category.name : '';
  }

  onUserSelected(event: any) {
    const user = event.option.value as User;
    this.courseForm.patchValue({
      loginId: user.id
    });
  }

  onCategorySelected(event: any) {
    const category = event.option.value as Category;
    this.courseForm.patchValue({
      categoryId: category.categoryId
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting = true;
      const formData = { ...this.courseForm.value };
      
      // Remove search fields before sending to backend
      delete formData.userSearch;
      delete formData.categorySearch;
      
      this.courseService.updateCourse(this.courseId, formData).subscribe({
        next: (response) => {
          this.snackBar.open('Course updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error updating course:', error);
          this.snackBar.open('Error updating course. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.submitting = false;
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
    }
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}
