import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <mat-card class="p-20">
        <mat-card-content>
          <h2>Welcome {{ sessionData?.firstName }} {{ sessionData?.lastName }}</h2>
          <p>Role: {{ sessionData?.role }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class DashboardComponent {
  sessionData: LoginResponse | null;

  constructor(private authService: AuthService) {
    this.sessionData = this.authService.getCurrentUser();
  }
}
