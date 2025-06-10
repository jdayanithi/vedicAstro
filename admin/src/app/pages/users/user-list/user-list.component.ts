import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h1>Users</h1>
      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="full-width">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let user">{{user.id}}</td>
            </ng-container>

            <ng-container matColumnDef="firstName">
              <th mat-header-cell *matHeaderCellDef>First Name</th>
              <td mat-cell *matCellDef="let user">{{user.firstName}}</td>
            </ng-container>

            <ng-container matColumnDef="lastName">
              <th mat-header-cell *matHeaderCellDef>Last Name</th>
              <td mat-cell *matCellDef="let user">{{user.lastName}}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{user.email}}</td>
            </ng-container>

            <ng-container matColumnDef="userType">
              <th mat-header-cell *matHeaderCellDef>User Type</th>
              <td mat-cell *matCellDef="let user">{{user.userType}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary" [routerLink]="['/users', user.id]">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UserListComponent {
  users: any[] = []; // This will be populated from a service
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'userType', 'actions'];
}
