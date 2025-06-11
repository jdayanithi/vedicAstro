import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <h2>Manage Notifications</h2>
      <form [formGroup]="notificationForm" (ngSubmit)="onSubmit()" class="notification-form">
        <mat-form-field appearance="fill">
          <mat-label>Login ID</mat-label>
          <input matInput formControlName="loginId" required type="number" />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message" required></textarea>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Type</mat-label>
          <input matInput formControlName="notificationType" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">
          {{ editMode ? 'Update' : 'Add' }} Notification
        </button>
        <button mat-button type="button" *ngIf="editMode" (click)="cancelEdit()">Cancel</button>
      </form>
      <table mat-table [dataSource]="notifications" class="mat-elevation-z8">
        <ng-container matColumnDef="loginId">
          <th mat-header-cell *matHeaderCellDef> Login ID </th>
          <td mat-cell *matCellDef="let n"> {{ n.loginId }} </td>
        </ng-container>
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef> Title </th>
          <td mat-cell *matCellDef="let n"> {{ n.title }} </td>
        </ng-container>
        <ng-container matColumnDef="message">
          <th mat-header-cell *matHeaderCellDef> Message </th>
          <td mat-cell *matCellDef="let n"> {{ n.message }} </td>
        </ng-container>
        <ng-container matColumnDef="notificationType">
          <th mat-header-cell *matHeaderCellDef> Type </th>
          <td mat-cell *matCellDef="let n"> {{ n.notificationType }} </td>
        </ng-container>
        <ng-container matColumnDef="isRead">
          <th mat-header-cell *matHeaderCellDef> Read </th>
          <td mat-cell *matCellDef="let n"> {{ n.isRead ? 'Yes' : 'No' }} </td>
        </ng-container>
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef> Created </th>
          <td mat-cell *matCellDef="let n"> {{ n.createdAt | date:'short' }} </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let n">
            <button mat-icon-button color="primary" (click)="editNotification(n)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteNotification(n)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 24px; }
    .notification-form { display: flex; gap: 16px; margin-bottom: 24px; align-items: flex-end; flex-wrap: wrap; }
    mat-form-field { flex: 1; min-width: 180px; }
    table { width: 100%; margin-top: 16px; }
    th.mat-header-cell, td.mat-cell { text-align: left; }
    button[mat-icon-button] { margin-right: 8px; }
  `]
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns = ['loginId', 'title', 'message', 'notificationType', 'isRead', 'createdAt', 'actions'];
  notificationForm: FormGroup;
  editMode = false;
  editingId: number | null = null;

  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.notificationForm = this.fb.group({
      loginId: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
      notificationType: ['']
    });
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(n => this.notifications = n);
  }

  onSubmit() {
    if (this.notificationForm.invalid) return;
    const notification: Notification = this.notificationForm.value;
    if (this.editMode && this.editingId) {
      this.notificationService.updateNotification(this.editingId, notification).subscribe({
        next: () => {
          this.snackBar.open('Notification updated', 'Close', { duration: 2000 });
          this.loadNotifications();
          this.cancelEdit();
        },
        error: () => this.snackBar.open('Error updating notification', 'Close', { duration: 3000 })
      });
    } else {
      this.notificationService.createNotification(notification).subscribe({
        next: () => {
          this.snackBar.open('Notification added', 'Close', { duration: 2000 });
          this.loadNotifications();
          this.notificationForm.reset();
        },
        error: () => this.snackBar.open('Error adding notification', 'Close', { duration: 3000 })
      });
    }
  }

  editNotification(n: Notification) {
    this.editMode = true;
    this.editingId = n.notificationId!;
    this.notificationForm.patchValue({
      loginId: n.loginId,
      title: n.title,
      message: n.message,
      notificationType: n.notificationType
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.editingId = null;
    this.notificationForm.reset();
  }

  deleteNotification(n: Notification) {
    if (confirm(`Delete notification titled "${n.title}"?`)) {
      this.notificationService.deleteNotification(n.notificationId!).subscribe({
        next: () => {
          this.snackBar.open('Notification deleted', 'Close', { duration: 2000 });
          this.loadNotifications();
        },
        error: () => this.snackBar.open('Error deleting notification', 'Close', { duration: 3000 })
      });
    }
  }
}
