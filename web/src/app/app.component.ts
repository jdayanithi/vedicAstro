import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vedic Astrology';
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isSidenavOpen = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.getCurrentUserRole().pipe(
      map(role => role === 'ADMIN')
    );
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isSidenavOpen = false;
  }
}
