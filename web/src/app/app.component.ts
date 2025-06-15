import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NetworkStatusService } from './service/network-status.service';
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
  isOnline$: Observable<boolean>;
  isSidenavOpen = false;

  constructor(
    private authService: AuthService,
    private networkStatus: NetworkStatusService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.getCurrentUserRole().pipe(
      map(role => role === 'ADMIN')
    );
    this.isOnline$ = this.networkStatus.isOnline;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isSidenavOpen = false;
  }
}
