import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

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
  userTypes = ['student', 'instructor', 'admin'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
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
    });

    // Redirect to view-all if already logged in
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/view-all']);
      }
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
          next: (response) => {
            this.router.navigate(['/view-all']);
          },
          error: (error) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '300px',
              data: { message: error.error?.message || 'Invalid email or password. Please try again.' }
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
          },
          error: (error) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '300px',
              data: { message: error.error?.message || 'Registration failed. Please try again.' }
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
}
