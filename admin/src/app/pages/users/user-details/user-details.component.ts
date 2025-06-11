import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService, User } from '../../../services/users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>User Details</h1>
        <div class="actions">
          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to Users
          </button>          <button mat-raised-button color="accent" [routerLink]="['/users/edit', user.id]" *ngIf="user">
            <mat-icon>edit</mat-icon>
            Edit User
          </button>
        </div>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading && user" class="user-details">
        <!-- Basic Information -->
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>Basic Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">ID:</span>
                <span class="value">{{user.id}}</span>
              </div>
              <div class="info-item">
                <span class="label">Username:</span>
                <span class="value">{{user.username}}</span>
              </div>
              <div class="info-item">
                <span class="label">First Name:</span>
                <span class="value">{{user.firstName}}</span>
              </div>
              <div class="info-item">
                <span class="label">Last Name:</span>
                <span class="value">{{user.lastName}}</span>
              </div>
              <div class="info-item">
                <span class="label">Phone Number:</span>
                <span class="value">{{user.phoneNumber}}</span>
              </div>
              <div class="info-item">
                <span class="label">Role:</span>
                <span class="value">{{user.role}}</span>
              </div>
              <div class="info-item">
                <span class="label">User Type:</span>
                <mat-chip class="user-type-chip user-type-{{user.userType}}">
                  {{user.userType | titlecase}}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Birth Information -->
        <mat-card class="info-card" *ngIf="user.birthDate || user.birthTime || user.birthPlace">
          <mat-card-header>
            <mat-card-title>Birth Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item" *ngIf="user.birthDate">
                <span class="label">Birth Date:</span>
                <span class="value">{{user.birthDate | date:'fullDate'}}</span>
              </div>
              <div class="info-item" *ngIf="user.birthTime">
                <span class="label">Birth Time:</span>
                <span class="value">{{user.birthTime}}</span>
              </div>
              <div class="info-item" *ngIf="user.birthPlace">
                <span class="label">Birth Place:</span>
                <span class="value">{{user.birthPlace}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Astrological Information -->
        <mat-card class="info-card" *ngIf="user.zodiacSign || user.risingSign || user.moonSign">
          <mat-card-header>
            <mat-card-title>Astrological Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item" *ngIf="user.zodiacSign">
                <span class="label">Zodiac Sign:</span>
                <mat-chip class="astro-chip">{{user.zodiacSign}}</mat-chip>
              </div>
              <div class="info-item" *ngIf="user.risingSign">
                <span class="label">Rising Sign:</span>
                <mat-chip class="astro-chip">{{user.risingSign}}</mat-chip>
              </div>
              <div class="info-item" *ngIf="user.moonSign">
                <span class="label">Moon Sign:</span>
                <mat-chip class="astro-chip">{{user.moonSign}}</mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Bio and Additional Information -->
        <mat-card class="info-card" *ngIf="user.bio || user.profilePicture">
          <mat-card-header>
            <mat-card-title>Additional Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-item" *ngIf="user.profilePicture">
              <span class="label">Profile Picture:</span>
              <div class="profile-picture">
                <img [src]="user.profilePicture" 
                     [alt]="user.firstName + ' ' + user.lastName"
                     (error)="onImageError($event)">
              </div>
            </div>
            <div class="info-item bio-item" *ngIf="user.bio">
              <span class="label">Bio:</span>
              <p class="bio-text">{{user.bio}}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- System Information -->
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>System Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item" *ngIf="user.createdDate">
                <span class="label">Created Date:</span>
                <span class="value">{{user.createdDate | date:'medium'}}</span>
              </div>
              <div class="info-item" *ngIf="user.updatedDate">
                <span class="label">Updated Date:</span>
                <span class="value">{{user.updatedDate | date:'medium'}}</span>
              </div>
              <div class="info-item" *ngIf="user.createdBy">
                <span class="label">Created By:</span>
                <span class="value">{{user.createdBy}}</span>
              </div>
              <div class="info-item" *ngIf="user.updatedBy">
                <span class="label">Updated By:</span>
                <span class="value">{{user.updatedBy}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!loading && !user" class="no-user">
        <mat-icon>person_off</mat-icon>
        <h2>User Not Found</h2>
        <p>The user you're looking for doesn't exist or has been deleted.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          Go Back to Users
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
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

    .actions {
      display: flex;
      gap: 12px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 60px;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-card {
      width: 100%;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      align-items: center;
      min-height: 40px;
    }

    .bio-item {
      align-items: flex-start;
      flex-direction: column;
      grid-column: 1 / -1;
    }

    .label {
      font-weight: 600;
      color: #666;
      min-width: 120px;
      margin-right: 12px;
    }

    .value {
      color: #333;
      word-break: break-word;
    }

    .bio-text {
      margin: 8px 0 0 0;
      line-height: 1.5;
      color: #333;
    }

    .user-type-chip {
      font-size: 12px;
      font-weight: 500;
    }

    .user-type-student {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    .user-type-instructor {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }

    .user-type-admin {
      background-color: #ffebee;
      color: #c62828;
    }

    .astro-chip {
      background-color: #fff3e0;
      color: #e65100;
    }

    .profile-picture {
      margin-top: 8px;
    }

    .profile-picture img {
      max-width: 150px;
      max-height: 150px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .no-user {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .no-user mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    .no-user h2 {
      margin: 16px 0;
      color: #333;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .actions {
        width: 100%;
        justify-content: flex-start;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .label {
        min-width: auto;
        margin-right: 0;
        margin-bottom: 4px;
      }
    }
  `]
})
export class UserDetailsComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    if (!this.userId) return;

    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.snackBar.open('Error loading user details', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  onImageError(event: any): void {
    // Hide broken image
    event.target.style.display = 'none';
  }
}
