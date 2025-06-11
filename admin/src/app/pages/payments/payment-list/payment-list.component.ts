import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { PaymentService, Payment } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-list',
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
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Payment Management</h1>
        <div class="header-actions">
          <button mat-icon-button (click)="loadPayments()" matTooltip="Refresh">
            <mat-icon>refresh</mat-icon>
          </button>
          <button mat-raised-button color="primary" routerLink="add">
            <mat-icon>add</mat-icon>
            Add Payment
          </button>
        </div>
      </div>

      <!-- Filters -->
      <mat-card class="filter-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field>
              <mat-label>Search by Transaction ID</mat-label>
              <input matInput [(ngModel)]="searchQuery" (input)="applyFilters()" placeholder="Enter transaction ID">
            </mat-form-field>
            
            <mat-form-field>
              <mat-label>Filter by Status</mat-label>
              <mat-select [(ngModel)]="statusFilter" (selectionChange)="applyFilters()">
                <mat-option value="">All Statuses</mat-option>
                <mat-option value="pending">Pending</mat-option>
                <mat-option value="completed">Completed</mat-option>
                <mat-option value="failed">Failed</mat-option>
                <mat-option value="refunded">Refunded</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Filter by Payment Method</mat-label>
              <mat-select [(ngModel)]="paymentMethodFilter" (selectionChange)="applyFilters()">
                <mat-option value="">All Methods</mat-option>
                <mat-option value="credit_card">Credit Card</mat-option>
                <mat-option value="debit_card">Debit Card</mat-option>
                <mat-option value="paypal">PayPal</mat-option>
                <mat-option value="upi">UPI</mat-option>
                <mat-option value="net_banking">Net Banking</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-button (click)="clearFilters()">
              <mat-icon>clear</mat-icon>
              Clear Filters
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Loading spinner -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading payments...</p>
      </div>

      <!-- Payments table -->
      <mat-card *ngIf="!loading">
        <table mat-table [dataSource]="filteredPayments" class="mat-elevation-z2">
          
          <!-- Payment ID Column -->
          <ng-container matColumnDef="paymentId">
            <th mat-header-cell *matHeaderCellDef>Payment ID</th>
            <td mat-cell *matCellDef="let payment">{{payment.paymentId}}</td>
          </ng-container>

          <!-- Login ID Column -->
          <ng-container matColumnDef="loginId">
            <th mat-header-cell *matHeaderCellDef>User ID</th>
            <td mat-cell *matCellDef="let payment">{{payment.loginId}}</td>
          </ng-container>

          <!-- Course ID Column -->
          <ng-container matColumnDef="courseId">
            <th mat-header-cell *matHeaderCellDef>Course ID</th>
            <td mat-cell *matCellDef="let payment">{{payment.courseId}}</td>
          </ng-container>

          <!-- Amount Column -->
          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let payment">
              <strong>₹{{payment.amount | number:'1.2-2'}}</strong>
            </td>
          </ng-container>

          <!-- Payment Method Column -->
          <ng-container matColumnDef="paymentMethod">
            <th mat-header-cell *matHeaderCellDef>Payment Method</th>
            <td mat-cell *matCellDef="let payment">
              <mat-chip-set>
                <mat-chip>{{payment.paymentMethod | titlecase}}</mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <!-- Transaction ID Column -->
          <ng-container matColumnDef="transactionId">
            <th mat-header-cell *matHeaderCellDef>Transaction ID</th>
            <td mat-cell *matCellDef="let payment">
              <span class="transaction-id">{{payment.transactionId || 'N/A'}}</span>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let payment">
              <mat-chip-set>
                <mat-chip [ngClass]="getStatusClass(payment.status)">
                  {{payment.status | titlecase}}
                </mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <!-- Payment Date Column -->
          <ng-container matColumnDef="paymentDate">
            <th mat-header-cell *matHeaderCellDef>Payment Date</th>
            <td mat-cell *matCellDef="let payment">
              {{payment.paymentDate | date:'dd/MM/yyyy HH:mm'}}
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let payment">
              <button mat-icon-button [routerLink]="['edit', payment.paymentId]" matTooltip="Edit Payment">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="deletePayment(payment)" matTooltip="Delete Payment" color="warn">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <!-- No data message -->
        <div *ngIf="filteredPayments.length === 0" class="no-data">
          <mat-icon>payment</mat-icon>
          <h3>No payments found</h3>
          <p>{{payments.length === 0 ? 'No payments have been created yet.' : 'No payments match your current filters.'}}</p>
          <button *ngIf="payments.length === 0" mat-raised-button color="primary" routerLink="add">
            <mat-icon>add</mat-icon>
            Add First Payment
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1400px;
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

    .header-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .filter-card {
      margin-bottom: 20px;
    }

    .filters {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
    }

    .filters mat-form-field {
      min-width: 200px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }

    .loading-container mat-spinner {
      margin-bottom: 20px;
    }

    .mat-elevation-z2 {
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                  0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }

    table {
      width: 100%;
    }

    .transaction-id {
      font-family: monospace;
      font-size: 0.9rem;
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .status-pending {
      background-color: #fff3cd !important;
      color: #856404 !important;
    }

    .status-completed {
      background-color: #d4edda !important;
      color: #155724 !important;
    }

    .status-failed {
      background-color: #f8d7da !important;
      color: #721c24 !important;
    }

    .status-refunded {
      background-color: #d1ecf1 !important;
      color: #0c5460 !important;
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
      opacity: 0.5;
    }

    .no-data h3 {
      margin: 16px 0 8px 0;
      color: #333;
    }

    .no-data p {
      margin-bottom: 20px;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      
      .filters mat-form-field {
        width: 100%;
        min-width: unset;
      }
      
      .header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .header-actions {
        justify-content: center;
      }
    }
  `]
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  loading = false;
  
  // Filter properties
  searchQuery = '';
  statusFilter = '';
  paymentMethodFilter = '';

  displayedColumns: string[] = [
    'paymentId',
    'loginId', 
    'courseId',
    'amount',
    'paymentMethod',
    'transactionId',
    'status',
    'paymentDate',
    'actions'
  ];

  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.snackBar.open('Error loading payments', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPayments = this.payments.filter(payment => {
      const matchesSearch = !this.searchQuery || 
        (payment.transactionId && payment.transactionId.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesStatus = !this.statusFilter || payment.status === this.statusFilter;
      
      const matchesPaymentMethod = !this.paymentMethodFilter || payment.paymentMethod === this.paymentMethodFilter;
      
      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.paymentMethodFilter = '';
    this.applyFilters();
  }

  deletePayment(payment: Payment): void {
    if (confirm(`Are you sure you want to delete payment ${payment.paymentId}?`)) {
      this.paymentService.deletePayment(payment.paymentId!).subscribe({
        next: () => {
          this.snackBar.open('Payment deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadPayments();
        },
        error: (error) => {
          console.error('Error deleting payment:', error);
          this.snackBar.open('Error deleting payment', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
