import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * OnPush Base Component Mixin
 * Provides common OnPush patterns and utilities
 */
export class OnPushMixin implements OnDestroy {
  protected destroy$ = new Subject<void>();

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Safe property setter that triggers change detection
   */
  protected setSafely<T>(property: string, value: T): void {
    (this as any)[property] = value;
    this.cdr.markForCheck();
  }

  /**
   * Subscribe with automatic change detection and cleanup
   */
  protected subscribeWithDetection<T>(
    observable: any,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): void {
    observable.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value: T) => {
        if (next) next(value);
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        if (error) error(err);
        this.cdr.markForCheck();
      },
      complete: () => {
        if (complete) complete();
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Execute callback with change detection
   */
  protected executeWithDetection<T>(callback: () => T): T {
    const result = callback();
    this.cdr.markForCheck();
    return result;
  }

  /**
   * Async execute with change detection
   */
  protected async executeAsyncWithDetection<T>(callback: () => Promise<T>): Promise<T> {
    try {
      const result = await callback();
      this.cdr.markForCheck();
      return result;
    } catch (error) {
      this.cdr.markForCheck();
      throw error;
    }
  }

  /**
   * Debounced change detection trigger
   */
  protected createDebouncedDetection(delay: number = 100): (fn?: () => void) => void {
    let timeoutId: any;
    
    return (fn?: () => void) => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (fn) fn();
        this.cdr.markForCheck();
      }, delay);
    };
  }
}

/**
 * OnPush Form Mixin
 * Extends OnPushMixin with form-specific utilities
 */
export class OnPushFormMixin extends OnPushMixin {
  protected formErrors: any = {};
  protected formLoading = false;

  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  /**
   * Set form error with change detection
   */
  protected setFormError(field: string, error: any): void {
    this.formErrors = { ...this.formErrors, [field]: error };
    this.cdr.markForCheck();
  }

  /**
   * Clear form error with change detection
   */
  protected clearFormError(field: string): void {
    const { [field]: _, ...rest } = this.formErrors;
    this.formErrors = rest;
    this.cdr.markForCheck();
  }

  /**
   * Clear all form errors
   */
  protected clearAllFormErrors(): void {
    this.formErrors = {};
    this.cdr.markForCheck();
  }

  /**
   * Set form loading state
   */
  protected setFormLoading(loading: boolean): void {
    this.formLoading = loading;
    this.cdr.markForCheck();
  }

  /**
   * Execute form submission with loading state
   */
  protected async executeFormSubmission<T>(
    submission: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: any) => void
  ): Promise<T | undefined> {
    this.setFormLoading(true);
    this.clearAllFormErrors();

    try {
      const result = await submission();
      if (onSuccess) onSuccess(result);
      return result;
    } catch (error) {
      if (onError) onError(error);
      return undefined;
    } finally {
      this.setFormLoading(false);
    }
  }
}

/**
 * OnPush List Mixin
 * Extends OnPushMixin with list management utilities
 */
export class OnPushListMixin<T> extends OnPushMixin {
  protected items: T[] = [];
  protected loading = false;
  protected error: any = null;

  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  /**
   * Set items with change detection
   */
  protected setItems(items: T[]): void {
    this.items = [...items];
    this.cdr.markForCheck();
  }

  /**
   * Add item with change detection
   */
  protected addItem(item: T): void {
    this.items = [...this.items, item];
    this.cdr.markForCheck();
  }

  /**
   * Remove item by index
   */
  protected removeItem(index: number): void {
    this.items = this.items.filter((_, i) => i !== index);
    this.cdr.markForCheck();
  }

  /**
   * Update item by index
   */
  protected updateItem(index: number, item: T): void {
    this.items = this.items.map((existingItem, i) => i === index ? item : existingItem);
    this.cdr.markForCheck();
  }

  /**
   * Clear all items
   */
  protected clearItems(): void {
    this.items = [];
    this.cdr.markForCheck();
  }

  /**
   * Set loading state
   */
  protected setLoading(loading: boolean): void {
    this.loading = loading;
    this.cdr.markForCheck();
  }

  /**
   * Set error state
   */
  protected setError(error: any): void {
    this.error = error;
    this.cdr.markForCheck();
  }

  /**
   * Clear error
   */
  protected clearError(): void {
    this.error = null;
    this.cdr.markForCheck();
  }

  /**
   * Execute list operation with loading/error handling
   */
  protected async executeListOperation<R>(
    operation: () => Promise<R>,
    onSuccess?: (result: R) => void,
    onError?: (error: any) => void
  ): Promise<R | undefined> {
    this.setLoading(true);
    this.clearError();

    try {
      const result = await operation();
      if (onSuccess) onSuccess(result);
      return result;
    } catch (error) {
      this.setError(error);
      if (onError) onError(error);
      return undefined;
    } finally {
      this.setLoading(false);
    }
  }
}

/**
 * Constructor type for mixins
 */
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * OnPush mixin factory function
 */
export function WithOnPush<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    protected cdr!: ChangeDetectorRef;

    constructor(...args: any[]) {
      super(...args);
      // CDR should be injected by the component
    }

    protected markForCheck(): void {
      if (this.cdr) {
        this.cdr.markForCheck();
      }
    }

    protected detectChanges(): void {
      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }
  };
}

/**
 * Decorator for OnPush components
 */
export function OnPushComponent(target: any) {
  // Add OnPush utilities to the component prototype
  target.prototype.markForCheck = function() {
    if (this.cdr) {
      this.cdr.markForCheck();
    }
  };

  target.prototype.detectChanges = function() {
    if (this.cdr) {
      this.cdr.detectChanges();
    }
  };

  target.prototype.setSafely = function<T>(property: string, value: T) {
    (this as any)[property] = value;
    this.markForCheck();
  };

  return target;
}
