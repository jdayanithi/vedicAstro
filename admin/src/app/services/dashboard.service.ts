import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalCourses: number;
  publishedCourses: number;
  unpublishedCourses: number;
  totalPayments: number;
  totalPaymentAmount: number;
  totalUsers: number;
  totalTags: number;
  totalCategories: number;
  totalTopics: number;
  totalLessons: number;
  totalNotifications: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface UserJoiningData {
  date: string;
  count: number;
}

export interface PaymentTrendData {
  month: string;
  amount: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getCourseStatusChart(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.apiUrl}/course-status`);
  }

  getUserJoiningTrend(): Observable<UserJoiningData[]> {
    return this.http.get<UserJoiningData[]>(`${this.apiUrl}/user-joining-trend`);
  }

  getPaymentTrend(): Observable<PaymentTrendData[]> {
    return this.http.get<PaymentTrendData[]>(`${this.apiUrl}/payment-trend`);
  }

  getTopCategoriesChart(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(`${this.apiUrl}/top-categories`);
  }
}
