import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { DashboardService, DashboardStats, ChartData, UserJoiningData, PaymentTrendData } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatProgressBarModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule
  ],  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {{ sessionData?.firstName }} {{ sessionData?.lastName }}</p>
        <button mat-raised-button color="primary" (click)="refreshData()">
          <mat-icon>refresh</mat-icon>
          Refresh Data
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Dashboard Content -->
      <div *ngIf="!loading" class="dashboard-content">
        
        <!-- Stats Cards -->
        <div class="stats-grid">
          <mat-card class="stat-card course-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>school</mat-icon>
              <mat-card-title>Courses</mat-card-title>
              <mat-card-subtitle>Total courses in system</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ stats?.totalCourses || 0 }}</div>
              <div class="stat-details">
                <span class="published">{{ stats?.publishedCourses || 0 }} Published</span>
                <span class="unpublished">{{ stats?.unpublishedCourses || 0 }} Draft</span>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card payment-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>payment</mat-icon>
              <mat-card-title>Payments</mat-card-title>
              <mat-card-subtitle>Revenue & transactions</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">₹{{ formatCurrency(stats?.totalPaymentAmount || 0) }}</div>
              <div class="stat-details">
                <span>{{ stats?.totalPayments || 0 }} Transactions</span>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card user-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>people</mat-icon>
              <mat-card-title>Users</mat-card-title>
              <mat-card-subtitle>Registered users</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ stats?.totalUsers || 0 }}</div>
              <div class="stat-details">
                <span>Active learners</span>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card content-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>library_books</mat-icon>
              <mat-card-title>Content</mat-card-title>
              <mat-card-subtitle>Topics & Lessons</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{ stats?.totalLessons || 0 }}</div>
              <div class="stat-details">
                <span>{{ stats?.totalTopics || 0 }} Topics</span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Secondary Stats -->
        <div class="secondary-stats">
          <mat-card class="secondary-stat">
            <mat-icon>local_offer</mat-icon>
            <div>
              <span class="number">{{ stats?.totalTags || 0 }}</span>
              <span class="label">Tags</span>
            </div>
          </mat-card>

          <mat-card class="secondary-stat">
            <mat-icon>category</mat-icon>
            <div>
              <span class="number">{{ stats?.totalCategories || 0 }}</span>
              <span class="label">Categories</span>
            </div>
          </mat-card>

          <mat-card class="secondary-stat">
            <mat-icon>notifications</mat-icon>
            <div>
              <span class="number">{{ stats?.totalNotifications || 0 }}</span>
              <span class="label">Notifications</span>
            </div>
          </mat-card>
        </div>

        <!-- Charts Section -->
        <div class="charts-section">
          
          <!-- Course Status Chart -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title>Course Status Distribution</mat-card-title>
              <mat-card-subtitle>Published vs Unpublished courses</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="chart-container">
                <div class="donut-chart" *ngIf="courseStatusData.length > 0">
                  <div class="chart-legend">
                    <div *ngFor="let item of courseStatusData" class="legend-item">
                      <div class="legend-color" [style.background-color]="item.color"></div>
                      <span>{{ item.name }}: {{ item.value }}</span>
                    </div>
                  </div>
                  <div class="chart-visual">
                    <div class="donut-segments">
                      <div *ngFor="let item of courseStatusData; let i = index" 
                           class="donut-segment"
                           [style.--percentage]="getPercentage(item.value, getTotalCourses())"
                           [style.--color]="item.color"
                           [style.--rotation]="getRotation(i)">
                      </div>
                    </div>
                    <div class="donut-center">
                      <div class="center-number">{{ getTotalCourses() }}</div>
                      <div class="center-label">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- User Joining Trend -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title>User Registration Trend</mat-card-title>
              <mat-card-subtitle>New users over time (Last 30 days)</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="chart-container">
                <div class="line-chart" *ngIf="userJoiningData.length > 0">
                  <div class="chart-bars">
                    <div *ngFor="let data of userJoiningData.slice(-15)" 
                         class="bar-item">
                      <div class="bar" 
                           [style.height.%]="getBarHeight(data.count, getMaxUserJoining())">
                      </div>
                      <div class="bar-label">{{ formatDate(data.date) }}</div>
                      <div class="bar-value">{{ data.count }}</div>
                    </div>
                  </div>
                </div>
                <div *ngIf="userJoiningData.length === 0" class="no-data">
                  <mat-icon>trending_up</mat-icon>
                  <p>No user registration data available</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Payment Trend -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title>Revenue Trend</mat-card-title>
              <mat-card-subtitle>Monthly payment collection</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="chart-container">
                <div class="payment-chart" *ngIf="paymentTrendData.length > 0">
                  <div class="chart-bars">
                    <div *ngFor="let data of paymentTrendData.slice(-8)" 
                         class="payment-bar-item">
                      <div class="payment-bar" 
                           [style.height.%]="getBarHeight(data.amount, getMaxPaymentAmount())">
                      </div>
                      <div class="bar-label">{{ data.month }}</div>
                      <div class="bar-value">₹{{ formatCurrency(data.amount) }}</div>
                      <div class="bar-count">{{ data.count }} payments</div>
                    </div>
                  </div>
                </div>
                <div *ngIf="paymentTrendData.length === 0" class="no-data">
                  <mat-icon>payment</mat-icon>
                  <p>No payment data available</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Top Categories -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title>Popular Categories</mat-card-title>
              <mat-card-subtitle>Courses by category</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="chart-container">
                <div class="category-list" *ngIf="topCategoriesData.length > 0">
                  <div *ngFor="let category of topCategoriesData.slice(0, 8)" 
                       class="category-item">
                    <div class="category-info">
                      <span class="category-name">{{ category.name }}</span>
                      <span class="category-count">{{ category.value }} courses</span>
                    </div>
                    <div class="category-bar">
                      <div class="category-fill" 
                           [style.width.%]="getBarHeight(category.value, getMaxCategoryValue())"
                           [style.background-color]="category.color">
                      </div>
                    </div>
                  </div>
                </div>
                <div *ngIf="topCategoriesData.length === 0" class="no-data">
                  <mat-icon>category</mat-icon>
                  <p>No category data available</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

        </div>

        <!-- Quick Actions -->
        <mat-card class="quick-actions">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="action-buttons">
              <button mat-raised-button color="primary">
                <mat-icon>add</mat-icon>
                New Course
              </button>
              <button mat-raised-button color="accent">
                <mat-icon>people</mat-icon>
                Manage Users
              </button>
              <button mat-raised-button>
                <mat-icon>payment</mat-icon>
                View Payments
              </button>
              <button mat-raised-button>
                <mat-icon>notifications</mat-icon>
                Send Notification
              </button>
            </div>
          </mat-card-content>
        </mat-card>

      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .dashboard-header h1 {
      margin: 0;
      color: #1976d2;
      font-size: 2rem;
      font-weight: 500;
    }

    .dashboard-header p {
      margin: 4px 0 0 0;
      color: #666;
      font-size: 1rem;
    }

    .loading-container {
      text-align: center;
      padding: 40px;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
    }

    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .stat-card mat-card-header {
      padding-bottom: 8px;
    }

    .stat-card mat-icon[mat-card-avatar] {
      font-size: 28px;
      width: 40px;
      height: 40px;
      line-height: 40px;
    }

    .course-card mat-icon[mat-card-avatar] {
      background-color: #1976d2;
      color: white;
    }

    .payment-card mat-icon[mat-card-avatar] {
      background-color: #388e3c;
      color: white;
    }

    .user-card mat-icon[mat-card-avatar] {
      background-color: #f57c00;
      color: white;
    }

    .content-card mat-icon[mat-card-avatar] {
      background-color: #7b1fa2;
      color: white;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .stat-details {
      display: flex;
      gap: 16px;
      font-size: 0.9rem;
      color: #666;
    }

    .stat-details .published {
      color: #4caf50;
      font-weight: 500;
    }

    .stat-details .unpublished {
      color: #ff9800;
      font-weight: 500;
    }

    /* Secondary Stats */
    .secondary-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .secondary-stat {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      transition: transform 0.2s ease;
    }

    .secondary-stat:hover {
      transform: translateY(-1px);
    }

    .secondary-stat mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1976d2;
    }

    .secondary-stat .number {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }

    .secondary-stat .label {
      display: block;
      font-size: 0.9rem;
      color: #666;
    }

    /* Charts Section */
    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .chart-card {
      min-height: 350px;
    }

    .chart-container {
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Donut Chart */
    .donut-chart {
      display: flex;
      align-items: center;
      gap: 32px;
      width: 100%;
    }

    .chart-legend {
      flex: 1;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .chart-visual {
      position: relative;
      width: 150px;
      height: 150px;
    }

    .donut-segments {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .donut-segment {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        from calc(var(--rotation, 0) * 1deg),
        var(--color) 0deg,
        var(--color) calc(var(--percentage, 0) * 3.6deg),
        transparent calc(var(--percentage, 0) * 3.6deg)
      );
      mask: radial-gradient(circle at center, transparent 40%, black 40%);
    }

    .donut-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .center-number {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }

    .center-label {
      font-size: 0.8rem;
      color: #666;
    }

    /* Bar Charts */
    .line-chart, .payment-chart {
      width: 100%;
      height: 100%;
    }

    .chart-bars {
      display: flex;
      align-items: end;
      gap: 8px;
      height: 180px;
      padding: 20px 0;
    }

    .bar-item, .payment-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    .bar, .payment-bar {
      width: 100%;
      min-height: 4px;
      background: linear-gradient(to top, #1976d2, #42a5f5);
      border-radius: 2px 2px 0 0;
      transition: all 0.3s ease;
    }

    .payment-bar {
      background: linear-gradient(to top, #388e3c, #66bb6a);
    }

    .bar-item:hover .bar,
    .payment-bar-item:hover .payment-bar {
      opacity: 0.8;
      transform: scaleY(1.05);
    }

    .bar-label {
      font-size: 0.7rem;
      color: #666;
      margin-top: 8px;
      text-align: center;
      transform: rotate(-45deg);
      white-space: nowrap;
    }

    .bar-value {
      font-size: 0.8rem;
      font-weight: 500;
      color: #333;
      margin-top: 4px;
    }

    .bar-count {
      font-size: 0.7rem;
      color: #666;
    }

    /* Category Chart */
    .category-list {
      width: 100%;
      padding: 20px 0;
    }

    .category-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 16px;
    }

    .category-info {
      flex: 1;
      min-width: 0;
    }

    .category-name {
      display: block;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .category-count {
      display: block;
      font-size: 0.8rem;
      color: #666;
    }

    .category-bar {
      flex: 1;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .category-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    /* No Data State */
    .no-data {
      text-align: center;
      color: #999;
      padding: 40px;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    /* Quick Actions */
    .quick-actions {
      margin-top: 24px;
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .action-buttons button {
      flex: 1;
      min-width: 150px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .secondary-stats {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }

      .charts-section {
        grid-template-columns: 1fr;
      }

      .donut-chart {
        flex-direction: column;
        gap: 16px;
      }

      .chart-bars {
        gap: 4px;
      }

      .bar-label {
        transform: rotate(-90deg);
        font-size: 0.6rem;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-buttons button {
        min-width: unset;
      }
    }

    @media (max-width: 480px) {
      .stat-number {
        font-size: 2rem;
      }

      .secondary-stat .number {
        font-size: 1.2rem;
      }

      .chart-container {
        height: 200px;     
       }
    }
  `],
})
export class DashboardComponent implements OnInit {
  sessionData: LoginResponse | null;
  loading = true;
  stats: DashboardStats | null = null;
  courseStatusData: ChartData[] = [];
  userJoiningData: UserJoiningData[] = [];
  paymentTrendData: PaymentTrendData[] = [];
  topCategoriesData: ChartData[] = [];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {
    this.sessionData = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    
    // Load all dashboard data
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });

    this.dashboardService.getCourseStatusChart().subscribe({
      next: (data) => {
        this.courseStatusData = data;
      },
      error: (error) => {
        console.error('Error loading course status data:', error);
      }
    });

    this.dashboardService.getUserJoiningTrend().subscribe({
      next: (data) => {
        this.userJoiningData = data;
      },
      error: (error) => {
        console.error('Error loading user joining data:', error);
      }
    });

    this.dashboardService.getPaymentTrend().subscribe({
      next: (data) => {
        this.paymentTrendData = data;
      },
      error: (error) => {
        console.error('Error loading payment trend data:', error);
      }
    });

    this.dashboardService.getTopCategoriesChart().subscribe({
      next: (data) => {
        this.topCategoriesData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading top categories data:', error);
        this.loading = false;
      }
    });
  }

  refreshData() {
    this.loadDashboardData();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? (value / total) * 100 : 0;
  }

  getTotalCourses(): number {
    return this.courseStatusData.reduce((sum, item) => sum + item.value, 0);
  }

  getMaxUserJoining(): number {
    return Math.max(...this.userJoiningData.map(d => d.count), 1);
  }

  getMaxPaymentAmount(): number {
    return Math.max(...this.paymentTrendData.map(d => d.amount), 1);
  }

  getMaxCategoryValue(): number {
    return Math.max(...this.topCategoriesData.map(d => d.value), 1);
  }

  getBarHeight(value: number, maxValue: number): number {
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  }

  getRotation(index: number): number {
    let rotation = 0;
    for (let i = 0; i < index; i++) {
      rotation += this.getPercentage(this.courseStatusData[i].value, this.getTotalCourses()) * 3.6;
    }
    return rotation;
  }
}
