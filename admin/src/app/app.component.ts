import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { CopyProtectionService } from './services/copy-protection.service';
import { PerformanceDashboardComponent } from './components/performance-dashboard/performance-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    PerformanceDashboardComponent
  ],  template: `
    <ng-container *ngIf="authService.isLoggedIn$ | async; else loginTemplate">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Vedic Astrology Admin</span>
        <span style="flex: 1"></span>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </mat-toolbar>

      <mat-drawer-container>
        <mat-drawer #drawer mode="side">
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              Dashboard
            </a>
            <a mat-list-item routerLink="/users" routerLinkActive="active">
              <mat-icon matListItemIcon>people</mat-icon>
              Users
            </a>
            <a mat-list-item routerLink="/categories" routerLinkActive="active">
              <mat-icon matListItemIcon>category</mat-icon>
              Categories
            </a>
            <a mat-list-item routerLink="/courses" routerLinkActive="active">
              <mat-icon matListItemIcon>school</mat-icon>
              Courses
            </a>
            <a mat-list-item routerLink="/topics" routerLinkActive="active">
              <mat-icon matListItemIcon>view_list</mat-icon>
              Topics
            </a>
            <a mat-list-item routerLink="/lessons" routerLinkActive="active">
              <mat-icon matListItemIcon>menu_book</mat-icon>
              Lessons
            </a>
            <a mat-list-item routerLink="/keynotes" routerLinkActive="active">
              <mat-icon matListItemIcon>notes</mat-icon>
              Keynotes
            </a>
            <a mat-list-item routerLink="/tags" routerLinkActive="active">
              <mat-icon matListItemIcon>local_offer</mat-icon>
              Tags
            </a>
            <a mat-list-item routerLink="/notifications" routerLinkActive="active">
              <mat-icon matListItemIcon>notifications</mat-icon>
              Notifications
            </a>
            <a mat-list-item routerLink="/payments" routerLinkActive="active">
              <mat-icon matListItemIcon>payment</mat-icon>
              Payments
            </a>
            <a mat-list-item routerLink="/customers/view" routerLinkActive="active">
              <mat-icon matListItemIcon>person</mat-icon>
              Customer View
            </a>
          </mat-nav-list>
        </mat-drawer>

        <mat-drawer-content>
          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </ng-container>

    <ng-template #loginTemplate>
      <div style="text-align:center; margin-top: 48px; margin-bottom: 32px; font-size: 2rem; font-weight: 600; letter-spacing: 1px;">
        Vedic Astrology Admin
      </div>
      <router-outlet></router-outlet>
    </ng-template>

    <!-- Performance Dashboard (always visible when authenticated) -->
    <app-performance-dashboard *ngIf="authService.isLoggedIn$ | async"></app-performance-dashboard>
  `,styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-toolbar {
      background: #1976d2 !important; /* Material blue 700 */
      color: #fff;
    }

    mat-drawer-container {
      height: calc(100% - 64px);
    }

    mat-drawer {
      width: 250px;
    }

    mat-drawer-content {
      padding: 20px;
    }

    .active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private copyProtectionService: CopyProtectionService
  ) {
    // Copy protection is automatically initialized through the service constructor
  }

  logout(): void {
    this.authService.logout();
  }
}
