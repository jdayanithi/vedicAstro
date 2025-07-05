import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { GoogleAuthService, GoogleUser } from '../../service/google-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { NetworkStatusService } from '../../service/network-status.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../AngularMaterialModule';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleButton', { static: false }) googleButton!: ElementRef;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  hidePassword = true;
  isLoginMode = true;
  userTypes = ['student', 'instructor', 'admin'];
  
  // Enhanced error handling
  isLoading = false;
  errorMessage = '';
  errorType: 'error' | 'warning' | 'info' | '' = '';
  showError = false;  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private dialog: MatDialog,
    private networkStatus: NetworkStatusService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: [''],
      userType: ['student', Validators.required]
    });    // Redirect to landing if already logged in
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // Add a small delay to ensure navigation happens after component initialization
        setTimeout(() => {
          this.router.navigate(['/landing']);
        }, 100);
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Render the official Google Sign-In button as a fallback
    if (this.googleButton?.nativeElement) {
      this.googleAuthService.renderButton(this.googleButton.nativeElement);
    }
  }  onSubmit(): void {
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        
        this.setLoadingState(true);
        
        this.authService.login(email, password).subscribe({
          next: (response) => {
            this.setLoadingState(false);
            this.showErrorMessage('Login successful! Redirecting...', 'info');
          },
          error: (error) => {
            this.setLoadingState(false);
            const errorMessage = this.getErrorMessage(error);
            this.showErrorMessage(errorMessage, 'error');
          }
        });
      } else {
        this.showErrorMessage('Please fill in all required fields correctly.', 'warning');
      }
    } else {
      if (this.registerForm.valid) {
        this.setLoadingState(true);
        
        this.authService.register(this.registerForm.value).subscribe({
          next: (response: { message: string }) => {
            this.setLoadingState(false);
            this.showErrorMessage('Registration successful! Please login with your credentials.', 'info');
            setTimeout(() => {
              this.toggleMode();
            }, 2000);
          },
          error: (error) => {
            this.setLoadingState(false);
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.status === 409) {
              errorMessage = 'An account with this email already exists. Please try logging in instead.';
            } else {
              errorMessage = this.getErrorMessage(error);
            }
            
            this.showErrorMessage(errorMessage, 'error');
          }
        });
      } else {
        this.showErrorMessage('Please fill in all required fields correctly.', 'warning');
      }
    }
  }toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
    this.registerForm.reset();
    this.clearError(); // Clear errors when switching modes
    if (!this.isLoginMode) {
      this.registerForm.patchValue({ userType: 'student' });
    }
  }

  // Enhanced error handling methods
  private showErrorMessage(message: string, type: 'error' | 'warning' | 'info' = 'error'): void {
    this.errorMessage = message;
    this.errorType = type;
    this.showError = true;
    
    // Auto-hide error after 5 seconds for non-critical errors
    if (type !== 'error') {
      setTimeout(() => this.clearError(), 5000);
    }
  }
  clearError(): void {
    this.errorMessage = '';
    this.errorType = '';
    this.showError = false;
  }

  private setLoadingState(loading: boolean): void {
    this.isLoading = loading;
    if (loading) {
      this.clearError();
      if (this.isLoginMode) {
        this.loginForm.disable();
      } else {
        this.registerForm.disable();
      }
    } else {
      if (this.isLoginMode) {
        this.loginForm.enable();
      } else {
        this.registerForm.enable();
      }
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return this.networkStatus.getConnectionErrorMessage();
    } else if (error.status === 401) {
      return 'Invalid email or password. Please check your credentials and try again.';
    } else if (error.status === 403) {
      return 'Your account access has been restricted. Please contact support.';
    } else if (error.status === 404) {
      return 'Account not found. Please check your email or create a new account.';
    } else if (error.status === 429) {
      return 'Too many login attempts. Please wait a few minutes before trying again.';
    } else if (error.status >= 500) {
      return 'Server error occurred. Our team has been notified. Please try again later.';
    } else if (error.error?.message) {
      return error.error.message;
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }  signInWithGoogle(): void {
    this.setLoadingState(true);
    
    this.googleAuthService.signIn().then((googleUser: GoogleUser) => {
      // Send the Google ID token to your backend for verification
      this.authService.googleLogin(googleUser.credential).subscribe({
        next: (response) => {
          this.setLoadingState(false);
          this.showErrorMessage('Google login successful! Redirecting...', 'info');
        },
        error: (error) => {
          this.setLoadingState(false);
          const errorMessage = this.getErrorMessage(error);
          this.showErrorMessage(errorMessage, 'error');
        }
      });
    }).catch((error) => {
      this.setLoadingState(false);
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      if (error.message.includes('not displayed')) {
        errorMessage = 'Google Sign-In popup was blocked. Please allow popups for this site and try again.';
      } else if (error.message.includes('skipped') || error.message.includes('cancelled')) {
        errorMessage = 'Google Sign-In was cancelled. Please try again if you want to continue.';
        this.showErrorMessage(errorMessage, 'warning');
        return;
      } else if (error.message.includes('library not loaded')) {
        errorMessage = 'Google Sign-In is not available. Please refresh the page and try again.';
      }
      
      this.showErrorMessage(errorMessage, 'error');
    });
  }
}
