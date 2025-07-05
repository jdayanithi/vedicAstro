import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyProtectionService {
  
  constructor() {
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

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    }, true);

    // Disable F12 (Developer Tools)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
    }, true);

    // Disable copy/paste/cut/save shortcuts
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

    // Disable print
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      alert('Printing is not allowed');
      return false;
    });

    // Monitor for developer tools
    this.detectDevTools();
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
}
