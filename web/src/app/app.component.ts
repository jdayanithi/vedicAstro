import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NetworkStatusService } from './service/network-status.service';
import { Observable, map } from 'rxjs';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LDML Astro';
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isOnline$: Observable<boolean>;
  isSidenavOpen = false;
  
  constructor(
    private authService: AuthService,
    private networkStatus: NetworkStatusService,
    private platform: Platform
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.getCurrentUserRole().pipe(
      map(role => role === 'ADMIN')
    );
    this.isOnline$ = this.networkStatus.isOnline;
    
    // Disable context menu and keyboard shortcuts
    this.disableSecurityFeatures();
  }

  async ngOnInit() {
    // Initialize status bar when platform is ready
    if (this.platform.is('capacitor')) {
      await this.initializeStatusBar();
    }
  }
  private async initializeStatusBar(): Promise<void> {
    try {
      // Set status bar to not overlay the WebView content
      await StatusBar.setOverlaysWebView({ overlay: false });
      
      // Set status bar style and color
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#1976d2' });
    } catch (error) {
      console.error('Status bar initialization failed:', error);
    }
  }

  private disableSecurityFeatures(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
      // Ctrl+C (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Ctrl+V (Paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }
      // Ctrl+X (Cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }
      return true;
    });

    // Disable text selection
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable drag
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isSidenavOpen = false;
  }
}
