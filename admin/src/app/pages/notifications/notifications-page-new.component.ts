import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService, Notification } from '../../services/notification.service';
import { NotificationFormComponent } from './notification-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notifications-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatChipModule,
    MatTooltipModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <div class="header-content">
              <h2>Manage Notifications</h2>
              <button mat-raised-button color="primary" (click)="openNotificationForm()">
                <mat-icon>add</mat-icon>
                Add New Notification
              </button>
            </div>
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="notifications" class="mat-elevation-z2">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef> Title </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.title }}
                </td>
              </ng-container>

              <ng-container matColumnDef="message">
                <th mat-header-cell *matHeaderCellDef> Message </th>
                <td mat-cell *matCellDef="let notification"> 
                  <div class="message-cell" [matTooltip]="notification.message">
                    {{ notification.message | slice:0:50 }}{{notification.message.length > 50 ? '...' : ''}}
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="notificationType">
                <th mat-header-cell *matHeaderCellDef> Type </th>
                <td mat-cell *matCellDef="let notification">
                  <mat-chip [color]="notification.notificationType === 'push' ? 'primary' : 'accent'">
                    {{ notification.notificationType | titlecase }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="loginId">
                <th mat-header-cell *matHeaderCellDef> User ID </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.loginId }}
                </td>
              </ng-container>

              <ng-container matColumnDef="startDate">
                <th mat-header-cell *matHeaderCellDef> Start Date </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.startDate | date:'short' || '-' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="expiryDate">
                <th mat-header-cell *matHeaderCellDef> Expiry Date </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.expiryDate | date:'short' || '-' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="isRead">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let notification">
                  <mat-chip [color]="notification.isRead ? 'primary' : 'warn'">
                    {{ notification.isRead ? 'Read' : 'Unread' }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let notification">
                  <button mat-icon-button (click)="editNotification(notification)" aria-label="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="toggleReadStatus(notification)" 
                          [matTooltip]="notification.isRead ? 'Mark as Unread' : 'Mark as Read'">
                    <mat-icon>{{ notification.isRead ? 'mark_email_unread' : 'mark_email_read' }}</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteNotification(notification)" aria-label="Delete" color="warn">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .header-content h2 {
      margin: 0;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
    }

    th.mat-header-cell {
      font-weight: 600;
      color: #333;
    }

    .mat-mdc-button .mat-icon {
      margin-right: 8px;
    }

    .message-cell {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    mat-chip {
      font-size: 0.8rem;
    }
  `]
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns: string[] = ['title', 'message', 'notificationType', 'loginId', 'startDate', 'expiryDate', 'isRead', 'actions'];

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => this.notifications = notifications,
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.snackBar.open('Error loading notifications', 'Close', { duration: 3000 });
      }
    });
  }

  openNotificationForm(notification?: Notification): void {
    const dialogRef = this.dialog.open(NotificationFormComponent, {
      width: '600px',
      data: { notification }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadNotifications();
      }
    });
  }

  editNotification(notification: Notification): void {
    this.openNotificationForm(notification);
  }

  toggleReadStatus(notification: Notification): void {
    const updatedNotification = { ...notification, isRead: !notification.isRead };
    this.notificationService.updateNotification(notification.notificationId!, updatedNotification).subscribe({
      next: () => {
        this.snackBar.open(`Notification marked as ${updatedNotification.isRead ? 'read' : 'unread'}`, 'Close', { duration: 2000 });
        this.loadNotifications();
      },
      error: (error) => {
        console.error('Error updating notification status:', error);
        this.snackBar.open('Error updating notification status', 'Close', { duration: 3000 });
      }
    });
  }

  deleteNotification(notification: Notification): void {
    if (confirm(`Are you sure you want to delete the notification "${notification.title}"?`)) {
      this.notificationService.deleteNotification(notification.notificationId!).subscribe({
        next: () => {
          this.snackBar.open('Notification deleted successfully', 'Close', { duration: 3000 });
          this.loadNotifications();
        },
        error: (error) => {
          console.error('Error deleting notification:', error);
          this.snackBar.open('Error deleting notification', 'Close', { duration: 3000 });
        }
      });
    }
  }
}

