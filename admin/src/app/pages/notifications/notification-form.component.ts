import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],  template: `
    <h2 mat-dialog-title>{{editMode ? 'Edit' : 'Create'}} Notification</h2>
    <mat-dialog-content>
      <form [formGroup]="notificationForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Login ID</mat-label>
          <input matInput formControlName="loginId" type="number" required>
          <mat-error *ngIf="notificationForm.get('loginId')?.hasError('required')">
            Login ID is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
          <mat-error *ngIf="notificationForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message" rows="4" required></textarea>
          <mat-error *ngIf="notificationForm.get('message')?.hasError('required')">
            Message is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Notification Type</mat-label>
          <mat-select formControlName="notificationType" required>
            <mat-option value="push">Push Notification</mat-option>
            <mat-option value="email">Email</mat-option>
          </mat-select>
          <mat-error *ngIf="notificationForm.get('notificationType')?.hasError('required')">
            Notification type is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Start Date</mat-label>
          <input matInput [matDatepicker]="startPicker" formControlName="startDate">
          <mat-hint>Leave empty for immediate delivery</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
          <mat-datepicker #startPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Expiry Date</mat-label>
          <input matInput [matDatepicker]="expiryPicker" formControlName="expiryDate">
          <mat-hint>Leave empty for no expiry</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="expiryPicker"></mat-datepicker-toggle>
          <mat-datepicker #expiryPicker></mat-datepicker>
        </mat-form-field>

        <div class="checkbox-container">
          <mat-checkbox formControlName="isRead">Mark as Read</mat-checkbox>
        </div>

        <div class="button-container">
          <button mat-button type="button" mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="notificationForm.invalid || isLoading">
            {{isLoading ? 'Saving...' : (editMode ? 'Update' : 'Create')}}
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    
    .checkbox-container {
      margin: 16px 0;
    }
    
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
    
    mat-dialog-content {
      min-width: 500px;
      max-width: 600px;
    }
  `]
})
export class NotificationFormComponent {
  notificationForm: FormGroup;
  editMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NotificationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notification?: Notification }
  ) {
    this.editMode = !!data?.notification;
    this.notificationForm = this.createForm();
    
    if (this.editMode && data.notification) {
      this.populateForm(data.notification);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      loginId: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      notificationType: ['push', Validators.required],
      startDate: [''],
      expiryDate: [''],
      isRead: [false]
    });
  }

  private populateForm(notification: Notification): void {
    this.notificationForm.patchValue({
      loginId: notification.loginId,
      title: notification.title,
      message: notification.message,
      notificationType: notification.notificationType || 'push',
      startDate: notification.startDate ? new Date(notification.startDate) : '',
      expiryDate: notification.expiryDate ? new Date(notification.expiryDate) : '',
      isRead: notification.isRead || false
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formValue = this.notificationForm.value;
      
      const notificationData: Notification = {
        loginId: formValue.loginId,
        title: formValue.title,
        message: formValue.message,
        notificationType: formValue.notificationType,
        startDate: formValue.startDate ? formValue.startDate.toISOString().split('T')[0] : undefined,
        expiryDate: formValue.expiryDate ? formValue.expiryDate.toISOString().split('T')[0] : undefined,
        isRead: formValue.isRead
      };

      if (this.editMode && this.data.notification) {
        notificationData.notificationId = this.data.notification.notificationId;
        this.updateNotification(notificationData);
      } else {
        this.createNotification(notificationData);
      }
    }
  }
  private createNotification(notification: Notification): void {
    this.notificationService.createNotification(notification).subscribe({
      next: (result) => {
        this.snackBar.open('Notification created successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error creating notification:', error);
        this.snackBar.open('Error creating notification', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private updateNotification(notification: Notification): void {
    this.notificationService.updateNotification(notification.notificationId!, notification).subscribe({
      next: (result) => {
        this.snackBar.open('Notification updated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error updating notification:', error);
        this.snackBar.open('Error updating notification', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
