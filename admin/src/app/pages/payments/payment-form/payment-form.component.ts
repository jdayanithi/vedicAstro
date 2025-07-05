import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentService, Payment } from '../../../services/payment.service';
import { UserService } from '../../../services/users.service';
import { CourseService } from '../../../services/course.service';
import { Observable, startWith, map } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ isEditMode ? 'Edit Payment' : 'Add New Payment' }}</h1>
        <button mat-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Payments
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Payment Details' : 'Payment Information' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <form *ngIf="!loading" [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="payment-form">
            
            <!-- User and Course Information -->
            <div class="section">
              <h3>Transaction Details</h3>
              
              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>User ID</mat-label>
                  <input matInput type="number" formControlName="loginId" required>
                  <mat-error *ngIf="paymentForm.get('loginId')?.hasError('required')">
                    User ID is required
                  </mat-error>
                  <mat-error *ngIf="paymentForm.get('loginId')?.hasError('min')">
                    User ID must be greater than 0
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Course ID</mat-label>
                  <input matInput type="number" formControlName="courseId" required>
                  <mat-error *ngIf="paymentForm.get('courseId')?.hasError('required')">
                    Course ID is required
                  </mat-error>
                  <mat-error *ngIf="paymentForm.get('courseId')?.hasError('min')">
                    Course ID must be greater than 0
                  </mat-error>
                </mat-form-field>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="section">
              <h3>Payment Information</h3>
              
              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Amount</mat-label>
                  <input matInput type="number" formControlName="amount" required step="0.01" min="0">
                  <span matPrefix>â‚¹&nbsp;</span>
                  <mat-error *ngIf="paymentForm.get('amount')?.hasError('required')">
                    Amount is required
                  </mat-error>
                  <mat-error *ngIf="paymentForm.get('amount')?.hasError('min')">
                    Amount must be greater than 0
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Payment Method</mat-label>
                  <mat-select formControlName="paymentMethod" required>
                    <mat-option value="credit_card">Credit Card</mat-option>
                    <mat-option value="debit_card">Debit Card</mat-option>
                    <mat-option value="paypal">PayPal</mat-option>
                    <mat-option value="upi">UPI</mat-option>
                    <mat-option value="net_banking">Net Banking</mat-option>
                    <mat-option value="wallet">Digital Wallet</mat-option>
                  </mat-select>
                  <mat-error *ngIf="paymentForm.get('paymentMethod')?.hasError('required')">
                    Payment method is required
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Transaction ID</mat-label>
                  <input matInput formControlName="transactionId" placeholder="Auto-generated if empty">
                  <mat-hint>Leave empty to auto-generate</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status" required>
                    <mat-option value="pending">Pending</mat-option>
                    <mat-option value="completed">Completed</mat-option>
                    <mat-option value="failed">Failed</mat-option>
                    <mat-option value="refunded">Refunded</mat-option>
                  </mat-select>
                  <mat-error *ngIf="paymentForm.get('status')?.hasError('required')">
                    Status is required
                  </mat-error>
                </mat-form-field>
              </div>              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Payment Date</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="paymentDate" required>
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                  <mat-error *ngIf="paymentForm.get('paymentDate')?.hasError('required')">
                    Payment date is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Expiry Date</mat-label>
                  <input matInput [matDatepicker]="expiryPicker" formControlName="expiryDate">
                  <mat-datepicker-toggle matSuffix [for]="expiryPicker"></mat-datepicker-toggle>
                  <mat-datepicker #expiryPicker></mat-datepicker>
                  <mat-hint>Optional: When payment access expires</mat-hint>                </mat-form-field>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="section">
              <h3>Additional Information</h3>
              
              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Created By (User ID)</mat-label>
                  <input matInput type="number" formControlName="createdBy" min="1">
                  <mat-hint>ID of user who created this payment record</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Modified By (User ID)</mat-label>
                  <input matInput type="number" formControlName="modifiedBy" min="1">
                  <mat-hint>ID of user who last modified this payment record</mat-hint>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Comments</mat-label>
                  <textarea matInput formControlName="comments" rows="3" placeholder="Additional notes about the payment"></textarea>
                  <mat-hint>Optional comments or notes</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">
                Cancel
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="paymentForm.invalid || submitting">
                <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                <span *ngIf="!submitting">{{ isEditMode ? 'Update Payment' : 'Create Payment' }}</span>
                <span *ngIf="submitting">{{ isEditMode ? 'Updating...' : 'Creating...' }}</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
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
      color: #333;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .payment-form {
      padding: 20px 0;
    }

    .section {
      margin-bottom: 30px;
    }

    .section h3 {
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 8px;
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
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
      gap: 15px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    mat-card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    mat-card-header {
      background: #f5f5f5;
      margin: -24px -24px 0 -24px;
      padding: 20px 24px;
      border-bottom: 1px solid #e0e0e0;
    }

    mat-card-title {
      color: #333;
      font-size: 1.2rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }

      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions button {
        width: 100%;
      }
    }

    /* Form validation styles */
    .mat-form-field.ng-invalid.ng-touched .mat-form-field-outline-thick {
      color: #f44336;
    }

    .mat-form-field.ng-invalid.ng-touched .mat-form-field-label {
      color: #f44336;
    }
  `]
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  isEditMode = false;
  paymentId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.paymentId = +params['id'];
        this.loadPayment();
      }
    });
  }  createForm(): void {
    this.paymentForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.min(1)]],
      courseId: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required],
      transactionId: [''],
      status: ['pending', Validators.required],
      paymentDate: [new Date(), Validators.required],
      expiryDate: [''],
      createdBy: [''],
      modifiedBy: [''],
      comments: ['']
    });
  }

  loadPayment(): void {
    if (!this.paymentId) return;
    
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment) => {        this.paymentForm.patchValue({
          loginId: payment.loginId,
          courseId: payment.courseId,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          transactionId: payment.transactionId,
          status: payment.status,
          paymentDate: payment.paymentDate ? new Date(payment.paymentDate) : new Date(),
          expiryDate: payment.expiryDate ? new Date(payment.expiryDate) : null,
          createdBy: payment.createdBy,
          modifiedBy: payment.modifiedBy,
          comments: payment.comments
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading payment:', error);
        this.snackBar.open('Error loading payment details', 'Close', {
          duration: 3000
        });
        this.loading = false;
        this.goBack();
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.submitting = true;
      
      const formValue = { ...this.paymentForm.value };
        // Format payment date
      if (formValue.paymentDate instanceof Date) {
        formValue.paymentDate = formValue.paymentDate.toISOString();
      }

      // Format expiry date
      if (formValue.expiryDate instanceof Date) {
        formValue.expiryDate = formValue.expiryDate.toISOString();
      }

      // Generate transaction ID if not provided
      if (!formValue.transactionId) {
        formValue.transactionId = this.generateTransactionId();
      }

      const paymentData: Payment = {
        ...formValue,
        ...(this.isEditMode && { paymentId: this.paymentId })
      };

      const request = this.isEditMode 
        ? this.paymentService.updatePayment(this.paymentId!, paymentData)
        : this.paymentService.createPayment(paymentData);

      request.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Payment updated successfully' : 'Payment created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/payments']);
        },
        error: (error) => {
          console.error('Error saving payment:', error);
          const message = error.error?.message || 'Error saving payment';
          this.snackBar.open(message, 'Close', { duration: 5000 });
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/payments']);
  }

  private generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `TXN${timestamp}${random}`.toUpperCase();
  }
}

