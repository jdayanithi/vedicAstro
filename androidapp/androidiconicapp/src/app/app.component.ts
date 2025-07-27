import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication status and navigate accordingly
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        // User is logged in, redirect to concepts if on login page
        if (this.router.url === '/login' || this.router.url === '/') {
          this.router.navigate(['/concepts']);
        }
      } else {
        // User is not logged in, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }
}
