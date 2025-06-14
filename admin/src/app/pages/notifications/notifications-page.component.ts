import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule
  ],template: `
    <div class="container">
      <h2>Manage Notifications</h2>
      
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title>{{ editMode ? 'Edit Notification' : 'Add New Notification' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="notificationForm" (ngSubmit)="onSubmit()" class="notification-form">
            
            <!-- Basic Information -->
            <div class="form-section">
              <h3>Basic Information</h3>
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Login ID</mat-label>
                  <input matInput formControlName="loginId" required type="number" min="1" />
                  <mat-error *ngIf="notificationForm.get('loginId')?.hasError('required')">
                    Login ID is required
                  </mat-error>
                  <mat-error *ngIf="notificationForm.get('loginId')?.hasError('min')">
                    Login ID must be greater than 0
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Notification Type</mat-label>
                  <mat-select formControlName="notificationType" required>
                    <mat-option value="push">Push Notification</mat-option>
                    <mat-option value="email">Email</mat-option>
                  </mat-select>
                  <mat-error *ngIf="notificationForm.get('notificationType')?.hasError('required')">
                    Notification type is required
                  </mat-error>
                  <mat-hint>Choose how to deliver this notification</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <!-- Content -->
            <div class="form-section">
              <h3>Content</h3>
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Title</mat-label>
                  <input matInput formControlName="title" required maxlength="100" />
                  <mat-error *ngIf="notificationForm.get('title')?.hasError('required')">
                    Title is required
                  </mat-error>
                  <mat-hint>Maximum 100 characters</mat-hint>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Message</mat-label>
                  <textarea matInput formControlName="message" required rows="4" maxlength="500"></textarea>
                  <mat-error *ngIf="notificationForm.get('message')?.hasError('required')">
                    Message is required
                  </mat-error>
                  <mat-hint>Maximum 500 characters</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <!-- Schedule -->
            <div class="form-section">
              <h3>Schedule</h3>
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Start Date</mat-label>
                  <input matInput [matDatepicker]="startPicker" formControlName="startDate" required>
                  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                  <mat-error *ngIf="notificationForm.get('startDate')?.hasError('required')">
                    Start date is required
                  </mat-error>
                  <mat-hint>When the notification becomes active</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Expiry Date</mat-label>
                  <input matInput [matDatepicker]="expiryPicker" formControlName="expiryDate">
                  <mat-datepicker-toggle matSuffix [for]="expiryPicker"></mat-datepicker-toggle>
                  <mat-datepicker #expiryPicker></mat-datepicker>
                  <mat-hint>Optional: When the notification expires</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-button type="button" *ngIf="editMode" (click)="cancelEdit()">
                Cancel
              </button>
              <button mat-icon-button type="button" (click)="loadNotifications()" matTooltip="Refresh notifications">
                <mat-icon>refresh</mat-icon>
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="notificationForm.invalid">
                <mat-icon>{{ editMode ? 'update' : 'add' }}</mat-icon>
                {{ editMode ? 'Update' : 'Add' }} Notification
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Notifications Table -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Notifications List</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="notifications" class="full-width">
            <ng-container matColumnDef="notificationId">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let n">{{ n.notificationId }}</td>
            </ng-container>

            <ng-container matColumnDef="loginId">
              <th mat-header-cell *matHeaderCellDef>Login ID</th>
              <td mat-cell *matCellDef="let n">{{ n.loginId }}</td>
            </ng-container>

            <ng-container matColumnDef="notificationType">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let n">
                <span class="notification-type-badge" [class]="'type-' + n.notificationType">
                  <mat-icon>{{ n.notificationType === 'push' ? 'notifications' : 'email' }}</mat-icon>
                  {{ n.notificationType | titlecase }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let n">{{ n.title }}</td>
            </ng-container>

            <ng-container matColumnDef="message">
              <th mat-header-cell *matHeaderCellDef>Message</th>
              <td mat-cell *matCellDef="let n">
                {{ n.message.length > 50 ? (n.message | slice:0:50) + '...' : n.message }}
              </td>
            </ng-container>

            <ng-container matColumnDef="startDate">
              <th mat-header-cell *matHeaderCellDef>Start Date</th>
              <td mat-cell *matCellDef="let n">{{ n.startDate | date:'short' }}</td>
            </ng-container>

            <ng-container matColumnDef="expiryDate">
              <th mat-header-cell *matHeaderCellDef>Expiry Date</th>
              <td mat-cell *matCellDef="let n">{{ n.expiryDate ? (n.expiryDate | date:'short') : 'No expiry' }}</td>
            </ng-container>

            <ng-container matColumnDef="isRead">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let n">
                <mat-icon [color]="n.isRead ? 'primary' : 'warn'">
                  {{ n.isRead ? 'mark_email_read' : 'mark_email_unread' }}
                </mat-icon>
                {{ n.isRead ? 'Read' : 'Unread' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let n">{{ n.createdAt | date:'short' }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let n">
                <button mat-icon-button color="primary" (click)="editNotification(n)" matTooltip="Edit notification">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteNotification(n)" matTooltip="Delete notification">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="notifications.length === 0" class="no-data">
            <mat-icon>notifications_off</mat-icon>
            <p>No notifications found.</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,  styles: [`
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 24px; 
    }
    
    .form-card, .table-card {
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .notification-form { 
      padding: 20px 0; 
    }
    
    .form-section {
      margin-bottom: 24px;
    }
    
    .form-section h3 {
      margin-bottom: 16px;
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 8px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .form-row .full-width {
      flex: 1;
    }
    
    .full-width { 
      width: 100%; 
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }
    
    .notification-type-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .type-push {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .type-email {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }
    
    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .no-data mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }
    
    table { 
      width: 100%; 
      margin-top: 16px; 
    }
    
    th.mat-header-cell, td.mat-cell { 
      text-align: left; 
    }
    
    button[mat-icon-button] { 
      margin-right: 8px; 
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .container {
        padding: 16px;
      }
      
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .form-actions button {
        width: 100%;
      }
    }
  `]
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns = ['notificationId', 'loginId', 'notificationType', 'title', 'message', 'startDate', 'expiryDate', 'isRead', 'createdAt', 'actions'];
  notificationForm: FormGroup;
  editMode = false;
  editingId: number | null = null;

  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.notificationForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      notificationType: ['push', Validators.required],
      startDate: [new Date(), Validators.required],
      expiryDate: ['']
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
    
    const formValue = { ...this.notificationForm.value };
    
    // Format dates
    if (formValue.startDate instanceof Date) {
      formValue.startDate = formValue.startDate.toISOString();
    }
    if (formValue.expiryDate instanceof Date) {
      formValue.expiryDate = formValue.expiryDate.toISOString();
    }
    
    const notification: Notification = formValue;
    
    if (this.editMode && this.editingId) {
      this.notificationService.updateNotification(this.editingId, notification).subscribe({
        next: () => {
          this.snackBar.open('Notification updated successfully', 'Close', { duration: 3000 });
          this.loadNotifications();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating notification:', error);
          const message = error.error?.message || 'Error updating notification';
          this.snackBar.open(message, 'Close', { duration: 5000 });
        }
      });
    } else {
      this.notificationService.createNotification(notification).subscribe({
        next: () => {
          this.snackBar.open('Notification created successfully', 'Close', { duration: 3000 });
          this.loadNotifications();
          this.notificationForm.reset({
            notificationType: 'push',
            startDate: new Date()
          });
        },
        error: (error) => {
          console.error('Error creating notification:', error);
          const message = error.error?.message || 'Error creating notification';
          this.snackBar.open(message, 'Close', { duration: 5000 });
        }
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
      notificationType: n.notificationType,
      startDate: n.startDate ? new Date(n.startDate) : new Date(),
      expiryDate: n.expiryDate ? new Date(n.expiryDate) : null
    });
  }
  cancelEdit() {
    this.editMode = false;
    this.editingId = null;
    this.notificationForm.reset({
      notificationType: 'push',
      startDate: new Date()
    });
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
