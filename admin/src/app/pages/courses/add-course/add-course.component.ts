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
import { UserService, User } from '../../../services/users.service';
import { CategoryService, Category } from '../../../services/category.service';
import { CourseService } from '../../../services/course.service';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
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
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  submitting = false;
  filteredUsers: Observable<User[]> = of([]);
  filteredCategories: Observable<Category[]> = of([]);
  
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private categoryService = inject(CategoryService);
  private courseService = inject(CourseService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      loginId: ['', Validators.required],
      userSearch: [''],
      categoryId: [''],
      categorySearch: [''],
      difficultyLevel: ['beginner', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      durationHours: ['', Validators.min(0)],
      thumbnailUrl: [''],
      isPublished: [false]
    });
  }

  ngOnInit() {
    this.setupAutocomplete();
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
    // If the value is a User object (from selection), return empty array
    if (typeof value !== 'string') {
      return of([]);
    }
    console.log('Filtering users with value:', value);
    const filterValue = value.trim().toLowerCase();
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
      
      console.log('Creating course with data:', formData);
      
      this.courseService.createCourse(formData).subscribe({
        next: (response) => {
          console.log('Course created successfully:', response);
          this.snackBar.open('Course created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error creating course:', error);
          this.snackBar.open('Error creating course. Please try again.', 'Close', {
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

  onThumbnailError(event: any) {
    // Hide the broken image and show placeholder
    event.target.style.display = 'none';
    const placeholder = event.target.parentElement.querySelector('.preview-placeholder');
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  onThumbnailLoad(event: any) {
    // Show the image and hide placeholder
    event.target.style.display = 'block';
    const placeholder = event.target.parentElement.querySelector('.preview-placeholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  }
}
