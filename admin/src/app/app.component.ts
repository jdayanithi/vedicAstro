import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CopyProtectionService } from './services/copy-protection.service';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  children?: NavigationItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule
  ],
  template: `
    <ng-container *ngIf="authService.isLoggedIn$ | async; else loginTemplate">
      <div class="admin-layout">
        <!-- Header -->
        <mat-toolbar class="app-header" color="primary">
          <button mat-icon-button (click)="toggleSidenav()" class="menu-toggle">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span class="app-title">
            <mat-icon>auto_awesome</mat-icon>
            Vedic Astrology Admin
          </span>
          
          <span class="spacer"></span>
          
          <div class="header-actions">
            <button mat-icon-button matTooltip="Notifications">
              <mat-icon>notifications</mat-icon>
            </button>
            
            <button mat-icon-button [matMenuTriggerFor]="userMenu" matTooltip="Account">
              <mat-icon>account_circle</mat-icon>
            </button>
            
            <mat-menu #userMenu="matMenu">
              <button mat-menu-item>
                <mat-icon>person</mat-icon>
                Profile
              </button>
              <button mat-menu-item>
                <mat-icon>settings</mat-icon>
                Settings
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                Logout
              </button>
            </mat-menu>
          </div>
        </mat-toolbar>

        <!-- Sidenav Container -->
        <mat-sidenav-container class="sidenav-container">
          <!-- Side Navigation -->
          <mat-sidenav 
            #sidenav
            mode="side" 
            [opened]="isSidenavOpen"
            class="app-sidenav">
            
            <div class="sidenav-content">
              <!-- Navigation Header -->
              <div class="nav-header">
                <h3>Navigation</h3>
              </div>
              
              <!-- Navigation Menu -->
              <mat-nav-list class="navigation-list">
                <a mat-list-item 
                   *ngFor="let item of navigationItems"
                   [routerLink]="item.route"
                   routerLinkActive="active-link"
                   [routerLinkActiveOptions]="{exact: false}"
                   class="nav-item">
                  <mat-icon matListIcon>{{ item.icon }}</mat-icon>
                  <span matLine>{{ item.label }}</span>
                </a>
              </mat-nav-list>
              
              <!-- Sidenav Footer -->
              <div class="sidenav-footer">
                <div class="version-info">
                  <small>Version 1.0.0</small>
                </div>
              </div>
            </div>
          </mat-sidenav>

          <!-- Main Content -->
          <mat-sidenav-content class="main-content">
            <div class="content-wrapper">
              <!-- Page Content -->
              <div class="page-content">
                <router-outlet></router-outlet>
              </div>
            </div>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>
    </ng-container>

    <ng-template #loginTemplate>
      <div style="text-align:center; margin-top: 48px; margin-bottom: 32px; font-size: 2rem; font-weight: 600; letter-spacing: 1px;">
        Vedic Astrology Admin
      </div>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .admin-layout {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      z-index: 1001;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
    }

    .app-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .app-sidenav {
      width: 260px;
      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
      border-right: 1px solid #e0e0e0;
      box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
    }

    .sidenav-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px 0;
    }

    .nav-header {
      padding: 0 24px 16px;
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 16px;
    }

    .nav-header h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #424242;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .navigation-list {
      flex: 1;
      padding: 0;
      margin-top: 8px;
    }

    .navigation-list .mat-mdc-list-item {
      --mdc-list-list-item-leading-space: 0px !important;
      --mdc-list-list-item-trailing-space: 0px !important;
      --mdc-list-list-item-one-line-height: 48px !important;
    }

    .navigation-list .mdc-list-item__primary-text {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
    }

    .navigation-list .mdc-list-item__content {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
      height: 48px !important;
    }

    .nav-item {
      margin: 4px 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
      color: #424242;
      height: 48px !important;
      min-height: 48px !important;
      max-height: 48px !important;
      display: flex !important;
      align-items: center !important;
      padding: 0 16px !important;
      text-decoration: none;
      position: relative;
    }

    .nav-item .mat-mdc-list-item-content {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
      width: 100% !important;
      height: 48px !important;
      padding: 0 !important;
    }

    .nav-item .mdc-list-item__content {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
      width: 100% !important;
      height: 48px !important;
      padding: 0 !important;
    }

    .nav-item:hover {
      background-color: #e3f2fd;
      color: #1976d2;
      transform: translateX(2px);
    }

    .nav-item.active-link {
      background-color: #1976d2;
      color: white;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);
    }

    .nav-item mat-icon {
      color: inherit !important;
      margin-right: 16px !important;
      font-size: 20px !important;
      width: 20px !important;
      height: 20px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      vertical-align: middle !important;
    }

    .nav-item span {
      font-size: 14px !important;
      font-weight: 500 !important;
      letter-spacing: 0.25px !important;
      line-height: 1 !important;
      flex: 1 !important;
      display: inline-block !important;
      vertical-align: middle !important;
      white-space: nowrap !important;
    }

    .nav-item .mat-mdc-list-item-unscoped-content {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
      width: 100% !important;
    }

    /* Override any Material Design multi-line behavior */
    .nav-item .mat-mdc-list-item-content .mat-mdc-list-item-primary-text {
      display: flex !important;
      align-items: center !important;
      flex-direction: row !important;
    }

    .nav-item.active-link span {
      font-weight: 600 !important;
    }

    .sidenav-footer {
      padding: 20px 16px 16px;
      border-top: 1px solid #e0e0e0;
      margin-top: auto;
      background: rgba(255, 255, 255, 0.8);
    }

    .version-info {
      text-align: center;
      color: #757575;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .main-content {
      background: #f5f5f5;
    }

    .content-wrapper {
      height: 100%;
      overflow: auto;
    }

    .page-content {
      padding: 24px;
      min-height: calc(100vh - 64px);
    }

    @media (max-width: 768px) {
      .app-sidenav {
        width: 240px;
      }
      
      .page-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  isSidenavOpen = true;
  
  navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/users'
    },
    {
      label: 'Categories',
      icon: 'category',
      route: '/categories'
    },
    {
      label: 'Courses',
      icon: 'school',
      route: '/courses'
    },
    {
      label: 'Topics',
      icon: 'topic',
      route: '/topics'
    },
    {
      label: 'Lessons',
      icon: 'library_books',
      route: '/lessons'
    },
    {
      label: 'Keynotes',
      icon: 'note',
      route: '/keynotes'
    },
    {
      label: 'Image Library',
      icon: 'photo_library',
      route: '/images'
    },
    {
      label: 'Tags',
      icon: 'label',
      route: '/tags'
    },
    {
      label: 'Notifications',
      icon: 'notifications',
      route: '/notifications'
    },
    {
      label: 'Payments',
      icon: 'payment',
      route: '/payments'
    },
    {
      label: 'Customers',
      icon: 'person',
      route: '/customers'
    }
  ];

  constructor(
    public authService: AuthService,
    private copyProtectionService: CopyProtectionService,
    private router: Router
  ) {
    // Copy protection is automatically initialized through the service constructor
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  logout(): void {
    this.authService.logout();
  }
}
