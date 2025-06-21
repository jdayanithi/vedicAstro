import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Payment {
  paymentId?: number;
  loginId: number;
  courseId: number;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate?: string;
  expiryDate?: string;
  createdBy?: number;
  modifiedBy?: number;
  comments?: string;
}

export interface UserCourseAccess {
  courseId: number;
  hasAccess: boolean;
  paymentStatus?: string;
  paymentDate?: string;
  expiryDate?: string;
}

export interface UserEnrolledCourse {
  courseId: number;
  title: string;
  description: string;
  loginId: number;
  categoryId: number;
  difficultyLevel: string;
  price: number;
  durationHours: number;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Get all payments for the current user
  getUserPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/user`);
  }

  // Check if user has access to a specific course
  checkCourseAccess(courseId: number): Observable<UserCourseAccess> {
    return this.http.get<UserCourseAccess>(`${this.apiUrl}/access/course/${courseId}`);
  }
  // Get all courses the user has access to
  getUserCourseAccess(): Observable<UserCourseAccess[]> {
    return this.http.get<UserCourseAccess[]>(`${this.apiUrl}/user/course-access`);
  }

  // Create a new payment
  createPayment(payment: Omit<Payment, 'paymentId'>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  // Get payment by transaction ID
  getPaymentByTransactionId(transactionId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/transaction/${transactionId}`);
  }

  // Verify payment status
  verifyPayment(paymentId: number): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/${paymentId}/verify`, {});
  }

  // Get user's enrolled courses (for My Courses tab)
  getUserEnrolledCourses(): Observable<UserEnrolledCourse[]> {
    return this.http.get<UserEnrolledCourse[]>(`${this.apiUrl}/user/enrolled-courses`);
  }

  // Get user's enrolled courses by login ID
  getUserEnrolledCoursesByLoginId(loginId: number): Observable<UserEnrolledCourse[]> {
    return this.http.get<UserEnrolledCourse[]>(`${this.apiUrl}/user/${loginId}/enrolled-courses`);
  }

  // Check if specific user has access to a course
  checkUserCourseAccessByLoginId(loginId: number, courseId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/${loginId}/course/${courseId}/access`);
  }

  // Get user's course access list by login ID
  getUserCourseAccessListByLoginId(loginId: number): Observable<UserCourseAccess[]> {
    return this.http.get<UserCourseAccess[]>(`${this.apiUrl}/user/${loginId}/course-access`);
  }
}
