import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService, User } from '../../../services/users.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>User Management</h1>
        <button mat-raised-button color="primary" routerLink="/users/add">
          <mat-icon>add</mat-icon>
          Add User
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Users</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Search -->
          <div class="search-container">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search users</mat-label>
              <input matInput 
                     [(ngModel)]="filterText" 
                     (input)="onFilterChange()"
                     placeholder="Search by name, username, phone, role, zodiac...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <!-- Loading -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <!-- Users Table -->
          <div *ngIf="!loading">
            <table mat-table [dataSource]="pagedUsers" class="full-width">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let user">{{user.id}}</td>
              </ng-container>

              <ng-container matColumnDef="username">
                <th mat-header-cell *matHeaderCellDef>Username</th>
                <td mat-cell *matCellDef="let user">{{user.username}}</td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let user">{{user.firstName}} {{user.lastName}}</td>
              </ng-container>

              <ng-container matColumnDef="phoneNumber">
                <th mat-header-cell *matHeaderCellDef>Phone</th>
                <td mat-cell *matCellDef="let user">{{user.phoneNumber}}</td>
              </ng-container>

              <ng-container matColumnDef="userType">
                <th mat-header-cell *matHeaderCellDef>User Type</th>
                <td mat-cell *matCellDef="let user">
                  <span class="user-type-badge user-type-{{user.userType}}">
                    {{user.userType | titlecase}}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef>Role</th>
                <td mat-cell *matCellDef="let user">{{user.role}}</td>
              </ng-container>

              <ng-container matColumnDef="birthDate">
                <th mat-header-cell *matHeaderCellDef>Birth Date</th>
                <td mat-cell *matCellDef="let user">{{user.birthDate | date:'shortDate'}}</td>
              </ng-container>

              <ng-container matColumnDef="zodiacSign">
                <th mat-header-cell *matHeaderCellDef>Zodiac</th>
                <td mat-cell *matCellDef="let user">{{user.zodiacSign}}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let user">
                  <button mat-icon-button color="primary" 
                          [routerLink]="['/users', user.id]"
                          matTooltip="View Details">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" 
                          (click)="editUser(user.id!)"
                          matTooltip="Edit User">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" 
                          (click)="deleteUser(user)"
                          matTooltip="Delete User">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <!-- No users message -->
            <div *ngIf="users.length === 0" class="no-data">
              <mat-icon>person_off</mat-icon>
              <p>No users found</p>
            </div>

            <!-- Pagination -->
            <mat-paginator
              [length]="filteredUsers.length"
              [pageSize]="pageSize"
              [pageIndex]="pageIndex"
              [pageSizeOptions]="[5, 10, 20]"
              (page)="onPageChange($event)">
            </mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
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

    .search-container {
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .full-width {
      width: 100%;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .user-type-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
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

    .mat-mdc-cell, .mat-mdc-header-cell {
      padding: 12px 8px;
    }

    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterText = '';
  pageIndex = 0;
  pageSize = 10;
  loading = false;
  searchQuery = '';
  displayedColumns: string[] = ['id', 'username', 'name', 'phoneNumber', 'userType', 'role', 'birthDate', 'zodiacSign', 'actions'];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.onFilterChange(); // Always update filtered list
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.snackBar.open('Error loading users', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  get pagedUsers(): User[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    const filter = this.filterText.trim().toLowerCase();
    if (!filter) {
      this.filteredUsers = this.users.slice();
    } else {
      this.filteredUsers = this.users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(filter)) ||
        (user.lastName && user.lastName.toLowerCase().includes(filter)) ||
        (user.username && user.username.toLowerCase().includes(filter)) ||
        (user.phoneNumber && user.phoneNumber.toLowerCase().includes(filter)) ||
        (user.role && user.role.toLowerCase().includes(filter)) ||
        (user.zodiacSign && user.zodiacSign.toLowerCase().includes(filter))
      );
    }
  }

  onSearchChange(): void {
    this.filterText = this.searchQuery;
    this.onFilterChange();
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
        }
      });
    }
  }
}

