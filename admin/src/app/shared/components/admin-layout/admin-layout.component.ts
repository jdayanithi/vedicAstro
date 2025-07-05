import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
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

  constructor(private router: Router, private authService: AuthService) {}

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
