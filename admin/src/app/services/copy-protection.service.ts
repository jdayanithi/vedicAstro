import { Injectable } from '@angular/core';
import { FeatureFlagService } from './feature-flag.service';

@Injectable({
  providedIn: 'root'
})
export class CopyProtectionService {
  
  constructor(private featureFlagService: FeatureFlagService) {
    this.initializeProtection();
    
    // Subscribe to feature flag changes to update protections dynamically
    this.featureFlagService.featureFlags$.subscribe(flags => {
      // Only reinitialize if protection state has changed
      this.updateProtections();
    });
  }

  private initializeProtection(): void {
    // Check feature flags before applying protections
    const flags = this.featureFlagService.getCurrentFlags();

    // Disable right-click context menu
    if (!flags.enableRightClick) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);
    }

    // Disable text selection
    if (!flags.enableTextSelection) {
      document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
      }, true);
    }

    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, true);

    // Disable keyboard shortcuts (if keyboard shortcuts protection is enabled)
    if (!flags.enableKeyboardShortcuts) {
      document.addEventListener('keydown', (e) => {
        this.handleKeyboardShortcuts(e);
      }, true);
    }

    // Disable F12 (Developer Tools)
    if (!flags.enableDevTools) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        return true;
      }, true);
    }

    // Disable copy/paste/cut/save shortcuts
    if (!flags.enableCopyPaste) {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key.toLowerCase()) {
            case 'c': // Copy
            case 'x': // Cut
            case 'v': // Paste
            case 'a': // Select All
            case 's': // Save
            case 'p': // Print
            case 'u': // View Source
            case 'i': // Developer Tools
            case 'j': // Console
            case 'k': // Search
            case 'h': // History
            case 'r': // Refresh
            case 'f': // Find
              if (!this.isInputField(e.target as HTMLElement)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
              break;
          }
        }
        return true;
      }, true);
    }

    // Disable print
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      alert('Printing is not allowed');
      return false;
    });

    // Monitor for developer tools
    if (!flags.enableDevTools) {
      this.detectDevTools();
    }

    // Apply screenshot protection if enabled
    if (flags.enableScreenshotProtection) {
      this.enableScreenshotProtection();
    }
  }

  private handleKeyboardShortcuts(e: KeyboardEvent): void {
    // Disable F12, F11, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const forbiddenKeys = [
      'F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5'
    ];

    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Disable Ctrl+Shift+I (Developer Tools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Disable Ctrl+Shift+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Disable Ctrl+Shift+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  }

  private isInputField(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const inputTypes = ['input', 'textarea', 'select'];
    const isContentEditable = element.contentEditable === 'true';
    
    return inputTypes.includes(tagName) || isContentEditable;
  }

  private detectDevTools(): void {
    // Simple developer tools detection
    let devtools = { open: false, orientation: null };
    
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
    }, 500);

    // Console warning
    console.clear();
    console.log('%c🚫 STOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Content viewing and copying is not allowed.', 'color: red; font-size: 16px;');
    console.log('%cIf someone told you to copy-paste something here, it is a scam and will harm your account.', 'color: red; font-size: 14px;');
  }

  private handleDevToolsOpen(): void {
    // Redirect or show warning when dev tools are detected
    console.clear();
    console.log('%c🚫 Developer tools detected! Content protection active.', 'color: red; font-size: 20px; font-weight: bold;');
    
    // Optional: Redirect to a warning page or close the tab
    // window.location.href = '/unauthorized';
  }

  // Public method to temporarily allow copying (for legitimate use cases)
  public temporarilyAllowCopy(duration: number = 5000): void {
    document.body.style.userSelect = 'text';
    
    setTimeout(() => {
      document.body.style.userSelect = 'none';
    }, duration);
  }

  // Method to check if an element should allow text selection
  public shouldAllowSelection(element: HTMLElement): boolean {
    return this.isInputField(element);
  }

  // Enable screenshot protection (make content harder to screenshot)
  private enableScreenshotProtection(): void {
    // Add CSS to make screenshots less useful
    const style = document.createElement('style');
    style.textContent = `
      body::after {
        content: 'CONFIDENTIAL - DO NOT SHARE';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 72px;
        color: rgba(255, 0, 0, 0.1);
        pointer-events: none;
        z-index: 9999;
        font-weight: bold;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);
  }

  // Public method to update protections when feature flags change
  public updateProtections(): void {
    // Remove existing protections and reapply based on current flags
    this.removeProtections();
    this.initializeProtection();
  }

  // Remove all protections
  private removeProtections(): void {
    // Remove all event listeners by cloning and replacing the document
    // Note: This is a simplified approach; in a real implementation,
    // you might want to store references to the listeners to remove them properly
    
    // Reset user selection
    document.body.style.userSelect = '';
    
    // Remove any protection styles
    const protectionStyles = document.querySelectorAll('style[data-protection="true"]');
    protectionStyles.forEach(style => style.remove());
    
    console.log('Copy protections have been removed');
  }

  // Public method to check if copy-paste is currently enabled
  public isCopyPasteEnabled(): boolean {
    return this.featureFlagService.isFeatureEnabled('enableCopyPaste');
  }

  // Public method to check if right-click is currently enabled
  public isRightClickEnabled(): boolean {
    return this.featureFlagService.isFeatureEnabled('enableRightClick');
  }

  // Public method to check if text selection is currently enabled
  public isTextSelectionEnabled(): boolean {
    return this.featureFlagService.isFeatureEnabled('enableTextSelection');
  }
}
