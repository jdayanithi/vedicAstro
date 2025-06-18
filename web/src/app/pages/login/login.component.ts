import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { GoogleAuthService, GoogleUser } from '../../service/google-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { NetworkStatusService } from '../../service/network-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hidePassword = true;
  isLoginMode = true;
  userTypes = ['student', 'instructor', 'admin'];  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private dialog: MatDialog,
    private networkStatus: NetworkStatusService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthTime: ['', Validators.required],
      birthPlace: ['', Validators.required],
      bio: [''],
      userType: ['student', Validators.required]
    });    // Redirect to landing if already logged in
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/landing']);
      }
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;        this.authService.login(email, password).subscribe({
          next: (response) => {
            // Navigation is now handled by the AuthService
          },
          error: (error) => {
            let errorMessage = 'An error occurred. Please try again.';
              // Handle different types of errors
            if (error.status === 0) {
              // Network error or server not running
              errorMessage = this.networkStatus.getConnectionErrorMessage();
            } else if (error.status === 401) {
              errorMessage = 'Invalid email or password. Please try again.';
            } else if (error.status >= 500) {
              errorMessage = 'Server error occurred. Please try again later.';
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }
            
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              data: { message: errorMessage }
            });
          }
        });
      }
    } else {
      if (this.registerForm.valid) {
        this.authService.register(this.registerForm.value).subscribe({
          next: (response: { message: string }) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '300px',
              data: { message: 'Registration successful! Please login.' }
            });
            this.toggleMode();
          },          error: (error) => {
            let errorMessage = 'Registration failed. Please try again.';
              // Handle different types of errors
            if (error.status === 0) {
              // Network error or server not running
              errorMessage = this.networkStatus.getConnectionErrorMessage();
            } else if (error.status >= 500) {
              errorMessage = 'Server error occurred. Please try again later.';
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }
            
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              data: { message: errorMessage }
            });
          }
        });
      }
    }
  }
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
    this.registerForm.reset();
    if (!this.isLoginMode) {
      this.registerForm.patchValue({ userType: 'student' });
    }
  }

  signInWithGoogle(): void {
    this.googleAuthService.signIn().then((googleUser: GoogleUser) => {
      // Send the Google ID token to your backend for verification
      this.authService.googleLogin(googleUser.credential).subscribe({
        next: (response) => {
          // Navigation is handled by the AuthService
        },
        error: (error) => {
          let errorMessage = 'Google login failed. Please try again.';
          
          if (error.status === 0) {
            errorMessage = this.networkStatus.getConnectionErrorMessage();
          } else if (error.status >= 500) {
            errorMessage = 'Server error occurred. Please try again later.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            data: { message: errorMessage }
          });
        }
      });
    }).catch((error) => {
      console.error('Google sign-in error:', error);
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: { message: 'Google sign-in was cancelled or failed.' }
      });
    });
  }
}
