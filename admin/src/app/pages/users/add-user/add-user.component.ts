import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService, User } from '../../../services/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h1>
        <button mat-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Users
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit User Details' : 'User Information' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <form *ngIf="!loading" [formGroup]="userForm" (ngSubmit)="onSubmit()" class="user-form">
            <!-- Basic Information -->
            <div class="section">
              <h3>Basic Information</h3>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Username</mat-label>
                  <input matInput formControlName="username" placeholder="Enter username">
                  <mat-error *ngIf="userForm.get('username')?.hasError('required')">
                    Username is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" *ngIf="!isEditMode">
                  <mat-label>Password</mat-label>
                  <input matInput 
                         [type]="hidePassword ? 'password' : 'text'" 
                         formControlName="password" 
                         placeholder="Enter password">
                  <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  <mat-error *ngIf="userForm.get('password')?.hasError('required')">
                    Password is required
                  </mat-error>
                  <mat-error *ngIf="userForm.get('password')?.hasError('minlength')">
                    Password must be at least 6 characters
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="firstName" placeholder="Enter first name">
                  <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">
                    First name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="lastName" placeholder="Enter last name">
                  <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">
                    Last name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Phone Number</mat-label>
                  <input matInput formControlName="phoneNumber" placeholder="Enter phone number">
                  <mat-error *ngIf="userForm.get('phoneNumber')?.hasError('required')">
                    Phone number is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>User Type</mat-label>
                  <mat-select formControlName="userType">
                    <mat-option value="student">Student</mat-option>
                    <mat-option value="instructor">Instructor</mat-option>
                    <mat-option value="admin">Admin</mat-option>
                  </mat-select>
                  <mat-error *ngIf="userForm.get('userType')?.hasError('required')">
                    User type is required
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Role</mat-label>
                <input matInput formControlName="role" placeholder="Enter role">
                <mat-error *ngIf="userForm.get('role')?.hasError('required')">
                  Role is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Birth Information -->
            <div class="section">
              <h3>Birth Information</h3>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Birth Date</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="birthDate">
                  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Birth Time</mat-label>
                  <input matInput type="time" formControlName="birthTime" placeholder="HH:MM">
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Birth Place</mat-label>
                <input matInput formControlName="birthPlace" placeholder="Enter birth place">
              </mat-form-field>
            </div>

            <!-- Astrological Information -->
            <div class="section">
              <h3>Astrological Information</h3>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Zodiac Sign</mat-label>
                  <mat-select formControlName="zodiacSign">
                    <mat-option *ngFor="let sign of zodiacSigns" [value]="sign">
                      {{sign}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Rising Sign</mat-label>
                  <mat-select formControlName="risingSign">
                    <mat-option *ngFor="let sign of zodiacSigns" [value]="sign">
                      {{sign}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Moon Sign</mat-label>
                <mat-select formControlName="moonSign">
                  <mat-option *ngFor="let sign of zodiacSigns" [value]="sign">
                    {{sign}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Additional Information -->
            <div class="section">
              <h3>Additional Information</h3>
              <mat-form-field appearance="outline">
                <mat-label>Bio</mat-label>
                <textarea matInput 
                          formControlName="bio" 
                          rows="4" 
                          placeholder="Enter user bio">
                </textarea>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Profile Picture URL</mat-label>
                <input matInput formControlName="profilePicture" placeholder="Enter profile picture URL">
              </mat-form-field>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      [disabled]="userForm.invalid || submitting">
                <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                {{ submitting ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User') }}
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

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header h1 {
      margin: 0;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .user-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .section {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background-color: #fafafa;
    }

    .section h3 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    .form-actions button {
      min-width: 120px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  loading = false;
  submitting = false;
  hidePassword = true;

  zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  roleOptions = [
    { value: 'USER', label: 'User' },
    { value: 'Admin', label: 'Admin' },
    { value: 'INSTRUCTOR', label: 'Instructor' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'MODERATOR', label: 'Moderator' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Initialize with basic form first
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      userType: ['student', [Validators.required]],
      role: ['USER', [Validators.required]],
      birthDate: [''],
      birthTime: [''],
      birthPlace: [''],
      zodiacSign: [''],
      risingSign: [''],
      moonSign: [''],
      bio: [''],
      profilePicture: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        console.log('🔧 Edit mode detected, userId:', this.userId);
        
        // Update password validation for edit mode
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        
        this.loadUser();
      } else {
        console.log('🔧 Add mode detected');
        // Set password validation for add mode
        this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.userForm.get('password')?.updateValueAndValidity();
      }
    });
  }

  loadUser(): void {
    if (!this.userId) return;

    console.log('🔧 Loading user with ID:', this.userId);
    
    // First check authentication info
    this.userService.checkAuthInfo().subscribe({
      next: (authInfo) => {
        console.log('🔧 Current auth info:', authInfo);
      },
      error: (error) => {
        console.error('🔧 Error checking auth info:', error);
      }
    });

    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log('🔧 User data loaded:', user);
        
        // Format date for input
        const formattedUser = {
          ...user,
          birthDate: user.birthDate ? new Date(user.birthDate) : null
        };
        
        console.log('🔧 Formatted user data:', formattedUser);
        this.userForm.patchValue(formattedUser);
        console.log('🔧 Form after patch:', this.userForm.value);
        this.loading = false;
      },
      error: (error) => {
        console.error('🔧 Error loading user:', error);
        console.error('🔧 Error details:', error.error);
        console.error('🔧 Error status:', error.status);
        this.snackBar.open('Error loading user details', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.submitting = true;
    const formValue = this.userForm.value;
    
    // Format the data for API
    const userData: User = {
      ...formValue,
      birthDate: formValue.birthDate ? formValue.birthDate.toISOString().split('T')[0] : null,
      updatedBy: 'admin' // You might want to get this from auth service
    };

    // Remove password if empty in edit mode
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }

    const request = this.isEditMode 
      ? this.userService.updateUser(this.userId!, userData)
      : this.userService.createUser(userData);

    request.subscribe({
      next: (result) => {
        const message = this.isEditMode ? 'User updated successfully' : 'User created successfully';
        this.snackBar.open(message, 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error saving user:', error);
        const message = error.error?.message || 'Error saving user';
        this.snackBar.open(message, 'Close', { duration: 5000 });
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
