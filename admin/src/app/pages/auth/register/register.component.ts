import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container flex justify-center align-center" style="min-height: 100vh;">
      <mat-card class="p-20" style="max-width: 600px; width: 100%;">
        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>        <mat-card-content>
          <!-- Error Message Display -->
          <div *ngIf="errorMessage" class="error-container">
            <mat-icon color="warn">error</mat-icon>
            <span class="error-text">{{errorMessage}}</span>
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-20">
            <div class="flex gap-20">
              <mat-form-field class="flex-1">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName">
                <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">First name is required</mat-error>
              </mat-form-field>

              <mat-form-field class="flex-1">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName">
                <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">Last name is required</mat-error>
              </mat-form-field>
            </div>

            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Password must be at least 6 characters</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Phone Number</mat-label>
              <input matInput type="tel" formControlName="phoneNumber">
              <mat-error *ngIf="registerForm.get('phoneNumber')?.hasError('required')">Phone number is required</mat-error>
              <mat-error *ngIf="registerForm.get('phoneNumber')?.hasError('pattern')">Please enter a valid phone number</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Birth Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="birthDate">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="registerForm.get('birthDate')?.hasError('required')">Birth date is required</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Birth Time</mat-label>
              <input matInput type="time" formControlName="birthTime">
              <mat-error *ngIf="registerForm.get('birthTime')?.hasError('required')">Birth time is required</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Birth Place</mat-label>
              <input matInput formControlName="birthPlace">
              <mat-error *ngIf="registerForm.get('birthPlace')?.hasError('required')">Birth place is required</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Bio</mat-label>
              <textarea matInput rows="3" formControlName="bio"></textarea>
            </mat-form-field>

            <mat-form-field>
              <mat-label>User Type</mat-label>
              <mat-select formControlName="userType">
                <mat-option value="student">Student</mat-option>
                <mat-option value="instructor">Instructor</mat-option>
                <mat-option value="admin">Admin</mat-option>
              </mat-select>
              <mat-error *ngIf="registerForm.get('userType')?.hasError('required')">User type is required</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid || isLoading">
              <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
              {{isLoading ? 'Creating account...' : 'Register'}}
            </button>
            
            <div class="text-center">
              <a mat-button routerLink="/login">Already have an account?</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .flex-1 {
      flex: 1;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      birthDate: ['', Validators.required],
      birthTime: ['', Validators.required],
      birthPlace: ['', Validators.required],
      bio: [''],
      userType: ['student', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const formData = this.registerForm.value;
      formData.birthDate = formData.birthDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      
      this.authService.register(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Registration successful! Please login.', 'Close', { 
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Registration failed:', error);
          
          // Extract error message from different possible error structures
          let errorMsg = 'Registration failed. Please try again.';
          
          if (error.error) {
            if (typeof error.error === 'string') {
              errorMsg = error.error;
            } else if (error.error.message) {
              errorMsg = error.error.message;
            } else if (error.error.error) {
              errorMsg = error.error.error;
            }
          } else if (error.message) {
            errorMsg = error.message;
          }
          
          // Handle specific registration errors
          if (errorMsg.toLowerCase().includes('username already exists') || 
              errorMsg.toLowerCase().includes('user already exists')) {
            errorMsg = 'An account with this email already exists. Please use a different email or try logging in.';
          } else if (errorMsg.toLowerCase().includes('email')) {
            errorMsg = 'Please provide a valid email address.';
          } else if (error.status === 400) {
            errorMsg = 'Invalid registration data. Please check all fields and try again.';
          } else if (error.status === 0) {
            errorMsg = 'Unable to connect to the server. Please check your internet connection.';
          } else if (error.status >= 500) {
            errorMsg = 'Server error. Please try again later.';
          }
          
          this.errorMessage = errorMsg;
          
          // Also show as snackbar for better visibility
          this.snackBar.open(errorMsg, 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
