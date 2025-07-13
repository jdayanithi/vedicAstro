import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NetworkStatusService } from './service/network-status.service';
import { CopyProtectionService } from './service/copy-protection.service';
import { SecurityService } from './services/security.service';
import { Observable, map, filter, startWith } from 'rxjs';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OfflineDialogComponent } from './components/offline-dialog/offline-dialog.component';

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
  isLoginPage$: Observable<boolean>;
  showScrollToTop = false;
  hasShownInitialOfflineMessage = false;
  
  constructor(
    private authService: AuthService,
    private networkStatus: NetworkStatusService,
    private platform: Platform,
    private router: Router,
    private copyProtectionService: CopyProtectionService,
    private securityService: SecurityService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isAdmin$ = this.authService.getCurrentUserRole().pipe(
      map(role => role === 'ADMIN')
    );
    this.isOnline$ = this.networkStatus.isOnline;
    
    this.isLoginPage$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects === '/login'),
      startWith(this.router.url === '/login')
    );
    
    // Copy protection is automatically initialized through the service constructor
    
    // Disable context menu and keyboard shortcuts
    this.disableSecurityFeatures();
    
    // Setup network connectivity monitoring
    this.setupNetworkMonitoring();
  }
  async ngOnInit() {
    // Check initial connectivity status
    this.checkInitialConnectivity();
    
    // Initialize status bar when platform is ready
    if (this.platform.is('capacitor')) {
      await this.initializeStatusBar();
      
      // Initialize security features for native platforms
      await this.securityService.initializeSecurity();
      
      // Perform comprehensive security audit
      await this.securityService.performSecurityAudit();
      
      // Add platform-specific CSS classes
      if (this.platform.is('android')) {
        document.body.classList.add('capacitor-android');
      } else if (this.platform.is('ios')) {
        document.body.classList.add('capacitor-ios');
      }
    } else {
      // Show security warning for web platform
      this.securityService.showWebSecurityWarning();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 300;
  }private async initializeStatusBar(): Promise<void> {
    try {
      // Set status bar to not overlay the WebView content
      await StatusBar.setOverlaysWebView({ overlay: false });
      
      // Set status bar style and color to match Android system
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#000000' });
      
      // Show the status bar (in case it was hidden)
      await StatusBar.show();
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

  navigateToHome(): void {
    this.router.navigate(['/landing']);
    this.isSidenavOpen = false; // Close sidenav if open
  }

  logout(): void {
    this.authService.logout();
    this.isSidenavOpen = false;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private setupNetworkMonitoring(): void {
    // Subscribe to network status changes
    this.isOnline$.subscribe(isOnline => {
      if (!isOnline && this.hasShownInitialOfflineMessage) {
        // Show offline message for subsequent disconnections
        this.showOfflineSnackbar();
      } else if (isOnline && this.hasShownInitialOfflineMessage) {
        // Show reconnection message
        this.showOnlineSnackbar();
      }
    });
  }

  private async checkInitialConnectivity(): Promise<void> {
    // Wait a bit longer for the network service to complete its initial check
    setTimeout(async () => {
      // Force a connectivity check to ensure we have the latest status
      await this.networkStatus.forceConnectivityCheck();
      
      if (!this.networkStatus.isOnlineValue) {
        console.log('Initial connectivity check: OFFLINE - showing dialog');
        this.showInitialOfflineDialog();
      } else {
        console.log('Initial connectivity check: ONLINE - no dialog needed');
      }
      this.hasShownInitialOfflineMessage = true;
    }, 2000); // Increased delay to allow the service to complete its check
  }

  private showInitialOfflineDialog(): void {
    const dialogRef = this.dialog.open(OfflineDialogComponent, {
      width: '90%',
      maxWidth: '400px',
      disableClose: true,
      data: {
        title: 'No Internet Connection',
        message: 'Please check your internet connection and try again. Some features may not work without an active connection.',
        isInitial: true
      }
    });

    // Auto-close dialog when connection is restored
    const subscription = this.isOnline$.subscribe(isOnline => {
      if (isOnline) {
        dialogRef.close();
        subscription.unsubscribe();
      }
    });
  }

  private showOfflineSnackbar(): void {
    this.snackBar.open(
      '🚫 Connection lost - You are now offline',
      'Dismiss',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['offline-snackbar']
      }
    );
  }

  private showOnlineSnackbar(): void {
    this.snackBar.open(
      '✅ Connection restored - You are back online',
      'Dismiss',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['online-snackbar']
      }
    );
  }
}
