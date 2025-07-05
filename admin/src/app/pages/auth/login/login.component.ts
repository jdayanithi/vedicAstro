import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container flex justify-center align-center" style="min-height: 100vh;">
      <mat-card class="p-20" style="max-width: 400px; width: 100%;">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>        <mat-card-content>
          <!-- Error Message Display -->
          <div *ngIf="errorMessage" class="error-container">
            <mat-icon color="warn">error</mat-icon>
            <span class="error-text">{{errorMessage}}</span>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-20">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter your email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
              <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
              {{isLoading ? 'Signing in...' : 'Login'}}
            </button>
            
            <div class="text-center">
              <a mat-button routerLink="/register">Need to register?</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .error-container {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #ffebee;
      border: 1px solid #f44336;
      border-radius: 4px;
      padding: 12px;
      margin-bottom: 20px;
    }

    .error-text {
      color: #d32f2f;
      font-size: 14px;
    }

    .flex {
      display: flex;
    }

    .flex-column {
      flex-direction: column;
    }

    .gap-20 > * + * {
      margin-top: 20px;
    }

    .text-center {
      text-align: center;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    // If user is already logged in, redirect to dashboard
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Login successful!', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          // Navigate to the return URL or dashboard
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed:', error);
          
          // Extract error message from different possible error structures
          let errorMsg = 'Login failed. Please try again.';
          
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
          
          // Handle specific authentication errors
          if (errorMsg.toLowerCase().includes('invalid username or password') || 
              errorMsg.toLowerCase().includes('authentication failed')) {
            errorMsg = 'Invalid email or password. Please check your credentials and try again.';
          } else if (error.status === 401) {
            errorMsg = 'Invalid email or password. Please check your credentials and try again.';
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
