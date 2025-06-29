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

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/secure/payments`;

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.apiUrl}/get-all`, {});
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/get-by-id`, { id: paymentId });
  }

  getPaymentsByUserId(loginId: number): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.apiUrl}/get-by-user`, { loginId: loginId });
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  updatePayment(paymentId: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}`, payment);
  }

  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentId}`);
  }
}
