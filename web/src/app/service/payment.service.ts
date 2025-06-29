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

export interface EnrolledCourseWithStatus {
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
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: string;
  transactionId: string;
  paidAmount: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Get all payments for the current user
  getUserPayments(): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.apiUrl}/get-by-user`, {});
  }

  // Check if user has access to a specific course
  checkCourseAccess(courseId: number): Observable<UserCourseAccess> {
    return this.http.post<UserCourseAccess>(`${this.apiUrl}/access/course`, { courseId: courseId });
  }

  // Get all courses the user has access to
  getUserCourseAccess(): Observable<UserCourseAccess[]> {
    return this.http.post<UserCourseAccess[]>(`${this.apiUrl}/user/course-access`, {});
  }

  // Create a new payment
  createPayment(payment: Omit<Payment, 'paymentId'>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  // Get payment by transaction ID
  getPaymentByTransactionId(transactionId: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/get-by-transaction`, { transactionId: transactionId });
  }

  // Verify payment status
  verifyPayment(paymentId: number): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/verify`, { id: paymentId });
  }

  // Get user's enrolled courses (for My Courses tab)
  getUserEnrolledCourses(): Observable<UserEnrolledCourse[]> {
    return this.http.post<UserEnrolledCourse[]>(`${this.apiUrl}/current-user/enrolled-courses`, {});
  }

  // Get user's enrolled courses by login ID
  getUserEnrolledCoursesByLoginId(loginId: number): Observable<UserEnrolledCourse[]> {
    return this.http.post<UserEnrolledCourse[]>(`${this.apiUrl}/user/enrolled-courses`, { loginId: loginId });
  }

  // Get user's enrolled courses with payment status by login ID
  getUserEnrolledCoursesWithStatusByLoginId(loginId: number): Observable<EnrolledCourseWithStatus[]> {
    return this.http.post<EnrolledCourseWithStatus[]>(`${this.apiUrl}/user/enrolled-courses-with-status`, { loginId: loginId });
  }

  // Get user's enrolled courses with payment status (for current user)
  getUserEnrolledCoursesWithStatus(): Observable<EnrolledCourseWithStatus[]> {
    return this.http.post<EnrolledCourseWithStatus[]>(`${this.apiUrl}/current-user/enrolled-courses-with-status`, {});
  }

  // Check if specific user has access to a course
  checkUserCourseAccessByLoginId(loginId: number, courseId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/user/course/access`, { loginId: loginId, courseId: courseId });
  }

  // Get user's course access list by login ID
  getUserCourseAccessListByLoginId(loginId: number): Observable<UserCourseAccess[]> {
    return this.http.post<UserCourseAccess[]>(`${this.apiUrl}/user/course-access`, { loginId: loginId });
  }

  // Get current user's course access list
  getCurrentUserCourseAccessList(): Observable<UserCourseAccess[]> {
    return this.http.post<UserCourseAccess[]>(`${this.apiUrl}/current-user/course-access`, {});
  }

  // Create payment with proof (for file upload)
  createPaymentWithProof(formData: FormData): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/with-proof`, formData);
  }
}
