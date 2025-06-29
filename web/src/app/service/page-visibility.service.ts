import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageVisibilityService {
  private isVisible = new BehaviorSubject<boolean>(!document.hidden);
  
  constructor() {
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.isVisible.next(!document.hidden);
    });
  }

  /**
   * Observable that emits true when page is visible, false when hidden
   */
  get isPageVisible$(): Observable<boolean> {
    return this.isVisible.asObservable();
  }

  /**
   * Get current page visibility status synchronously
   */
  get isPageVisible(): boolean {
    return !document.hidden;
  }

  /**
   * Execute a function only when the page is visible
   * @param callback Function to execute when page is visible
   * @param executeImmediately If true and page is currently visible, execute immediately
   */
  executeWhenVisible(callback: () => void, executeImmediately = true): void {
    if (this.isPageVisible && executeImmediately) {
      callback();
    } else {
      const subscription = this.isPageVisible$.subscribe(isVisible => {
        if (isVisible) {
          callback();
          subscription.unsubscribe(); // Execute only once
        }
      });
    }
  }

  /**
   * Conditional execution based on page visibility
   * @param callback Function to execute
   * @param onHidden Optional callback for when page becomes hidden
   */
  onVisibilityChange(callback: (isVisible: boolean) => void): () => void {
    const subscription = this.isPageVisible$.subscribe(callback);
    
    // Return unsubscribe function
    return () => subscription.unsubscribe();
  }
}
