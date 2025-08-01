import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService, Notification } from '../../services/notification.service';
import { NotificationFormComponent } from './notification-form.component';

@Component({
  selector: 'app-notifications-page',
  standalone: true,  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <mat-card>        <mat-card-header>
          <mat-card-title>
            <div class="header-content">
              <h2>Manage Notifications</h2>
              <div class="header-actions">
                <button mat-icon-button color="primary" (click)="loadNotifications()" 
                        matTooltip="Refresh notifications">
                  <mat-icon>refresh</mat-icon>
                </button>
                <button mat-raised-button color="primary" (click)="openNotificationForm()">
                  <mat-icon>add</mat-icon>
                  Add New Notification
                </button>
              </div>
            </div>
          </mat-card-title>
        </mat-card-header>        <mat-card-content>
          <div class="table-container" *ngIf="!isLoading">
            <table mat-table [dataSource]="notifications" class="mat-elevation-z2">              <ng-container matColumnDef="loginId">
                <th mat-header-cell *matHeaderCellDef> Login ID </th>
                <td mat-cell *matCellDef="let notification"> 
                  <span *ngIf="!notification.isBroadcast">{{ notification.loginId }}</span>
                  <span *ngIf="notification.isBroadcast" class="broadcast-indicator">All Users</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="isBroadcast">
                <th mat-header-cell *matHeaderCellDef> Broadcast </th>
                <td mat-cell *matCellDef="let notification"> 
                  <span class="broadcast-badge" [class.is-broadcast]="notification.isBroadcast" 
                        [class.not-broadcast]="!notification.isBroadcast">
                    {{ notification.isBroadcast ? 'Yes' : 'No' }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef> Title </th>
                <td mat-cell *matCellDef="let notification"> {{ notification.title }} </td>
              </ng-container>

              <ng-container matColumnDef="message">
                <th mat-header-cell *matHeaderCellDef> Message </th>
                <td mat-cell *matCellDef="let notification"> 
                  <span [matTooltip]="notification.message" class="message-preview">
                    {{ notification.message | slice:0:50 }}{{ notification.message.length > 50 ? '...' : '' }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="notificationType">
                <th mat-header-cell *matHeaderCellDef> Type </th>
                <td mat-cell *matCellDef="let notification"> 
                  <span class="type-badge" [class.type-push]="notification.notificationType === 'push'" 
                        [class.type-email]="notification.notificationType === 'email'">
                    {{ notification.notificationType || 'push' }}
                  </span>
                </td>
              </ng-container>              <ng-container matColumnDef="startDate">
                <th mat-header-cell *matHeaderCellDef> Start Date </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.startDate ? (notification.startDate | date:'short') : 'Immediate' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="expiryDate">
                <th mat-header-cell *matHeaderCellDef> Expiry Date </th>
                <td mat-cell *matCellDef="let notification"> 
                  {{ notification.expiryDate ? (notification.expiryDate | date:'short') : 'No expiry' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="isRead">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let notification"> 
                  <span class="status-badge" [class.read]="notification.isRead" [class.unread]="!notification.isRead">
                    {{ notification.isRead ? 'Read' : 'Unread' }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let notification">
                  <button mat-icon-button color="primary" (click)="openNotificationForm(notification)" 
                          matTooltip="Edit notification">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteNotification(notification)" 
                          matTooltip="Delete notification">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <div *ngIf="notifications.length === 0" class="no-data">
              <mat-icon>notifications_off</mat-icon>
              <p>No notifications found.</p>
            </div>
          </div>

          <div class="loading-container" *ngIf="isLoading">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading notifications...</p>
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
    }    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .header-content h2 {
      margin: 0;
      color: #333;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .table-container {
      overflow-x: auto;
      margin-top: 20px;
    }

    .mat-mdc-table {
      width: 100%;
      background: white;
    }

    .message-preview {
      display: inline-block;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: help;
    }

    .type-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .type-push {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .type-email {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .read {
      background-color: #e8f5e8;
      color: #2e7d32;
    }    .unread {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .broadcast-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .is-broadcast {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .not-broadcast {
      background-color: #f5f5f5;
      color: #666;
    }

    .broadcast-indicator {
      font-weight: 500;
      color: #2e7d32;
      font-style: italic;
    }

    .mat-mdc-cell {
      padding: 8px;
    }    .mat-mdc-header-cell {
      font-weight: 600;
      color: #333;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }

    .loading-container p {
      margin-top: 16px;
      font-size: 14px;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }
  `]
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns: string[] = ['loginId', 'isBroadcast', 'title', 'message', 'notificationType', 'startDate', 'expiryDate', 'isRead', 'actions'];
  isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }  private parseCustomDateToString(dateStr: any): string | undefined {
    if (!dateStr) return undefined;
    if (typeof dateStr === 'string') {
      const parts = dateStr.split(',').map(Number);
      if (parts.length === 6) {
        const d = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
        return isNaN(d.getTime()) ? undefined : d.toISOString();
      }
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? undefined : d.toISOString();
    }
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? undefined : dateStr.toISOString();
    }
    return undefined;
  }  loadNotifications(): void {
    this.isLoading = true;
    this.notificationService.getNotifications().subscribe({
      next: (notifications: Notification[]) => {
        this.notifications = notifications.map(n => ({
          ...n,
          startDate: this.parseCustomDateToString(n.startDate),
          expiryDate: this.parseCustomDateToString(n.expiryDate)
        }));
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading notifications:', error);
        this.snackBar.open('Error loading notifications', 'Close', { duration: 3000 });
        this.isLoading = false;
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
