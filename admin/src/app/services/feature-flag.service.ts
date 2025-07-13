import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FeatureFlags {
  enableCopyPaste: boolean;
  enableRightClick: boolean;
  enableTextSelection: boolean;
  enableDevTools: boolean;
  enableKeyboardShortcuts: boolean;
  enableScreenshotProtection: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  
  private readonly STORAGE_KEY = 'admin_feature_flags';
  
  private defaultFlags: FeatureFlags = {
    enableCopyPaste: false,
    enableRightClick: false,
    enableTextSelection: false,
    enableDevTools: false,
    enableKeyboardShortcuts: true,
    enableScreenshotProtection: true
  };

  private featureFlagsSubject = new BehaviorSubject<FeatureFlags>(this.defaultFlags);
  public featureFlags$ = this.featureFlagsSubject.asObservable();

  constructor() {
    this.loadFeatureFlags();
  }

  /**
   * Load feature flags from localStorage or use defaults
   */
  private loadFeatureFlags(): void {
    try {
      const savedFlags = localStorage.getItem(this.STORAGE_KEY);
      if (savedFlags) {
        const parsedFlags = JSON.parse(savedFlags);
        const mergedFlags = { ...this.defaultFlags, ...parsedFlags };
        this.featureFlagsSubject.next(mergedFlags);
      } else {
        this.saveFeatureFlags(this.defaultFlags);
      }
    } catch (error) {
      console.warn('Failed to load feature flags from localStorage:', error);
      this.featureFlagsSubject.next(this.defaultFlags);
    }
  }

  /**
   * Save feature flags to localStorage
   */
  private saveFeatureFlags(flags: FeatureFlags): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(flags));
    } catch (error) {
      console.warn('Failed to save feature flags to localStorage:', error);
    }
  }

  /**
   * Get current feature flags
   */
  getCurrentFlags(): FeatureFlags {
    return this.featureFlagsSubject.getValue();
  }

  /**
   * Check if a specific feature is enabled
   */
  isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    return this.getCurrentFlags()[feature];
  }

  /**
   * Enable/disable a specific feature
   */
  setFeatureFlag(feature: keyof FeatureFlags, enabled: boolean): void {
    const currentFlags = this.getCurrentFlags();
    const updatedFlags = { ...currentFlags, [feature]: enabled };
    this.featureFlagsSubject.next(updatedFlags);
    this.saveFeatureFlags(updatedFlags);
  }

  /**
   * Update multiple feature flags at once
   */
  updateFeatureFlags(updates: Partial<FeatureFlags>): void {
    const currentFlags = this.getCurrentFlags();
    const updatedFlags = { ...currentFlags, ...updates };
    this.featureFlagsSubject.next(updatedFlags);
    this.saveFeatureFlags(updatedFlags);
  }

  /**
   * Reset all feature flags to defaults
   */
  resetToDefaults(): void {
    this.featureFlagsSubject.next(this.defaultFlags);
    this.saveFeatureFlags(this.defaultFlags);
  }

  /**
   * Get observable for a specific feature flag
   */
  getFeatureFlag$(feature: keyof FeatureFlags): Observable<boolean> {
    return new Observable(observer => {
      const subscription = this.featureFlags$.subscribe(flags => {
        observer.next(flags[feature]);
      });
      return () => subscription.unsubscribe();
    });
  }
}
