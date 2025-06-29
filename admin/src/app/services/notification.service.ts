import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Notification {
  notificationId?: number;
  loginId?: number;  // Made optional for broadcast notifications
  isBroadcast?: boolean;  // New field
  title: string;
  message: string;
  isRead?: boolean;
  notificationType: 'push' | 'email';
  startDate?: string;
  expiryDate?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/secure/notifications`;

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.post<Notification[]>(`${this.apiUrl}/get-all`, {});
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/get-by-id`, { id });
  }

  getNotificationsByLoginId(loginId: number): Observable<Notification[]> {
    return this.http.post<Notification[]>(`${this.apiUrl}/get-by-user`, { loginId });
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  updateNotification(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${id}`, notification);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
