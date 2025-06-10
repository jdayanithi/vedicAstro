import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h1>User Details</h1>
      <mat-card class="p-20">
        <mat-card-content>
          <p>User ID: {{userId}}</p>
          <!-- User details will be displayed here -->
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UserDetailsComponent {
  userId: string | null;

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}
