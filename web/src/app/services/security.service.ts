import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    SecurityPlugin: {
      disableTextSelection(): Promise<void>;
      enableSecureMode(): Promise<void>;
      preventScreenshots(): Promise<{ success: boolean; message: string }>;
      allowScreenshots(): Promise<{ success: boolean; message: string }>;
      isSecureModeEnabled(): Promise<{ isSecure: boolean }>;
      checkDeviceSecurity(): Promise<{
        isRooted: boolean;
        developerOptionsEnabled: boolean;
        usbDebuggingEnabled: boolean;
        isSecureDevice: boolean;
      }>;
      clearWebViewData(): Promise<{ success: boolean; message: string }>;
      enableAdvancedSecurity(): Promise<{ success: boolean; message: string }>;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() {}

  /**
   * Check if running on a native platform
   */
  isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Disable text selection in WebView
   */
  async disableTextSelection(): Promise<void> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        await window.SecurityPlugin.disableTextSelection();
        console.log('Text selection disabled');
      } catch (error) {
        console.error('Failed to disable text selection:', error);
      }
    }
  }

  /**
   * Enable secure mode with additional WebView restrictions
   */
  async enableSecureMode(): Promise<void> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        await window.SecurityPlugin.enableSecureMode();
        console.log('Secure mode enabled');
      } catch (error) {
        console.error('Failed to enable secure mode:', error);
      }
    }
  }

  /**
   * Prevent screenshots and screen recording
   */
  async preventScreenshots(): Promise<boolean> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.preventScreenshots();
        console.log('Screenshot prevention:', result.message);
        return result.success;
      } catch (error) {
        console.error('Failed to prevent screenshots:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Allow screenshots (for development/testing)
   */
  async allowScreenshots(): Promise<boolean> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.allowScreenshots();
        console.log('Screenshot allowance:', result.message);
        return result.success;
      } catch (error) {
        console.error('Failed to allow screenshots:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Check if secure mode is currently enabled
   */
  async isSecureModeEnabled(): Promise<boolean> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.isSecureModeEnabled();
        return result.isSecure;
      } catch (error) {
        console.error('Failed to check secure mode status:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Initialize all security features
   */
  async initializeSecurity(): Promise<void> {
    if (this.isNativePlatform()) {
      console.log('Initializing security features...');
      
      // Enable all security features
      await this.disableTextSelection();
      await this.enableSecureMode();
      await this.preventScreenshots();
      await this.enableAdvancedSecurity();
      
      // Check device security status
      const deviceSecurity = await this.checkDeviceSecurity();
      if (deviceSecurity) {
        console.log('Device Security Status:', deviceSecurity);
        
        if (!deviceSecurity.isSecureDevice) {
          console.warn('⚠️ Device security issues detected:', {
            rooted: deviceSecurity.isRooted,
            devOptions: deviceSecurity.developerOptionsEnabled,
            usbDebug: deviceSecurity.usbDebuggingEnabled
          });
        }
      }
      
      // Check screenshot protection status
      const isSecure = await this.isSecureModeEnabled();
      console.log('Security status:', isSecure ? 'SECURE' : 'NOT SECURE');
    } else {
      console.log('Running on web platform - security features not available');
    }
  }

  /**
   * Check device security status
   */
  async checkDeviceSecurity(): Promise<{
    isRooted: boolean;
    developerOptionsEnabled: boolean;
    usbDebuggingEnabled: boolean;
    isSecureDevice: boolean;
  } | null> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.checkDeviceSecurity();
        return result;
      } catch (error) {
        console.error('Failed to check device security:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Clear WebView data for security
   */
  async clearWebViewData(): Promise<boolean> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.clearWebViewData();
        console.log('WebView data cleared:', result.message);
        return result.success;
      } catch (error) {
        console.error('Failed to clear WebView data:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Enable advanced security features
   */
  async enableAdvancedSecurity(): Promise<boolean> {
    if (this.isNativePlatform() && window.SecurityPlugin) {
      try {
        const result = await window.SecurityPlugin.enableAdvancedSecurity();
        console.log('Advanced security enabled:', result.message);
        return result.success;
      } catch (error) {
        console.error('Failed to enable advanced security:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Comprehensive security check and warning system
   */
  async performSecurityAudit(): Promise<void> {
    if (this.isNativePlatform()) {
      const deviceSecurity = await this.checkDeviceSecurity();
      const isSecure = await this.isSecureModeEnabled();
      
      console.log('=== SECURITY AUDIT ===');
      console.log('Screenshot Protection:', isSecure ? '✅ ENABLED' : '❌ DISABLED');
      
      if (deviceSecurity) {
        console.log('Device Rooted:', deviceSecurity.isRooted ? '⚠️ YES' : '✅ NO');
        console.log('Developer Options:', deviceSecurity.developerOptionsEnabled ? '⚠️ ENABLED' : '✅ DISABLED');
        console.log('USB Debugging:', deviceSecurity.usbDebuggingEnabled ? '⚠️ ENABLED' : '✅ DISABLED');
        console.log('Overall Security:', deviceSecurity.isSecureDevice ? '✅ SECURE' : '⚠️ COMPROMISED');
      }
      console.log('======================');
    }
  }

  /**
   * Show security warning for web platform
   */
  showWebSecurityWarning(): void {
    if (!this.isNativePlatform()) {
      console.warn('⚠️ Security Warning: Screenshot protection is only available in the native mobile app');
    }
  }
}
