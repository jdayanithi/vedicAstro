import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CopyProtectionService {
  
  constructor(private platform: Platform) {
    this.initializeProtection();
  }

  private initializeProtection(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Disable text selection
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    }, true);

    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, true);

    // Mobile-specific protections
    if (this.platform.is('mobile') || this.platform.is('tablet')) {
      this.initializeMobileProtection();
    }

    // Desktop-specific protections
    if (this.platform.is('desktop')) {
      this.initializeDesktopProtection();
    }

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    }, true);

    // Disable print
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      this.showProtectionMessage('Printing is not allowed');
      return false;
    });

    // Monitor for developer tools (desktop only)
    if (this.platform.is('desktop')) {
      this.detectDevTools();
    }

    // Disable screenshot on mobile (limited effectiveness)
    if (this.platform.is('android')) {
      this.disableAndroidScreenshot();
    }
  }

  private initializeMobileProtection(): void {
    // Disable long press context menu
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Disable long press
    document.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      if (touch && touch.target) {
        const element = touch.target as HTMLElement;
        if (!this.isInputField(element)) {
          e.preventDefault();
        }
      }
    });

    // Disable zoom gestures that might expose content
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gesturechange', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gestureend', (e) => {
      e.preventDefault();
    });

    // Disable double tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  private initializeDesktopProtection(): void {
    // Additional desktop-specific protections
    
    // Disable F12, F11, etc.
    document.addEventListener('keydown', (e) => {
      const forbiddenKeys = [
        'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5'
      ];

      if (forbiddenKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        this.showProtectionMessage('This action is not allowed');
        return false;
      }
      return true;
    }, true);

    // More comprehensive shortcut blocking
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ['c', 'x', 'v', 'a', 's', 'p', 'u', 'i', 'j', 'k', 'h', 'r', 'f'];
        if (blockedKeys.includes(e.key.toLowerCase()) && !this.isInputField(e.target as HTMLElement)) {
          e.preventDefault();
          e.stopPropagation();
          this.showProtectionMessage('Copy/paste operations are not allowed');
          return false;
        }
      }

      // Disable Ctrl+Shift combinations for dev tools
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const devToolsKeys = ['i', 'j', 'c'];
        if (devToolsKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopPropagation();
          this.showProtectionMessage('Developer tools are not allowed');
          return false;
        }
      }
      return true;
    }, true);
  }

  private handleKeyboardShortcuts(e: KeyboardEvent): void {
    // Basic keyboard shortcut handling for all platforms
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'c': // Copy
        case 'x': // Cut
        case 'v': // Paste
        case 'a': // Select All
          if (!this.isInputField(e.target as HTMLElement)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          break;
      }
    }
  }

  private disableAndroidScreenshot(): void {
    // This is limited in web apps, but we can try to detect and warn
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Potentially a screenshot or app switch
        console.clear();
        console.log('%c🚫 Content protection active', 'color: red; font-size: 20px;');
      }
    });
  }

  private isInputField(element: HTMLElement): boolean {
    if (!element) return false;
    
    const tagName = element.tagName.toLowerCase();
    const inputTypes = ['input', 'textarea', 'select', 'ion-input', 'ion-textarea'];
    const isContentEditable = element.contentEditable === 'true';
    
    return inputTypes.includes(tagName) || isContentEditable || 
           element.closest('ion-input') !== null || 
           element.closest('ion-textarea') !== null;
  }

  private detectDevTools(): void {
    // Simple developer tools detection for desktop
    let devtools = { open: false };
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          this.handleDevToolsOpen();
        }
      } else {
        devtools.open = false;
      }
    }, 1000);

    // Console warning
    this.showConsoleWarning();
  }

  private showConsoleWarning(): void {
    console.clear();
    console.log('%c🚫 STOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Content viewing and copying is not allowed.', 'color: red; font-size: 16px;');
    console.log('%cIf someone told you to copy-paste something here, it is a scam.', 'color: red; font-size: 14px;');
  }

  private handleDevToolsOpen(): void {
    console.clear();
    console.log('%c🚫 Developer tools detected! Content protection active.', 'color: red; font-size: 20px; font-weight: bold;');
    this.showProtectionMessage('Developer tools detected');
  }

  private showProtectionMessage(message: string): void {
    // For Ionic, we could show a toast or alert
    // For now, we'll use a simple alert
    if (this.platform.is('desktop')) {
      // Only show alerts on desktop to avoid interrupting mobile UX
      alert(`🚫 ${message}`);
    } else {
      // On mobile, just log to console
      console.log(`🚫 ${message}`);
    }
  }

  // Public method to temporarily allow copying (for legitimate use cases)
  public temporarilyAllowCopy(duration: number = 5000): void {
    const originalStyle = document.body.style.userSelect;
    document.body.style.userSelect = 'text';
    
    setTimeout(() => {
      document.body.style.userSelect = originalStyle || 'none';
    }, duration);
  }

  // Method to check if an element should allow text selection
  public shouldAllowSelection(element: HTMLElement): boolean {
    return this.isInputField(element);
  }

  // Method to enable/disable protection (for admin purposes)
  public toggleProtection(enable: boolean): void {
    if (enable) {
      this.initializeProtection();
    } else {
      // Remove event listeners (basic implementation)
      document.body.style.userSelect = 'text';
    }
  }
}
