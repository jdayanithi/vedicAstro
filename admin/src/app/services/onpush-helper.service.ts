import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

/**
 * OnPushHelper Service
 * Provides utilities and patterns for working with OnPush change detection strategy
 */
@Injectable({
  providedIn: 'root'
})
export class OnPushHelperService {

  /**
   * Creates an observable that automatically triggers change detection
   */
  createAutoDetectObservable<T>(
    source$: Observable<T>, 
    cdr: ChangeDetectorRef,
    onNext?: (value: T) => void,
    onError?: (error: any) => void
  ): Observable<T> {
    return source$.pipe(
      tap({
        next: (value) => {
          if (onNext) onNext(value);
          cdr.markForCheck();
        },
        error: (error) => {
          if (onError) onError(error);
          cdr.markForCheck();
        }
      })
    );
  }

  /**
   * Creates a state manager that automatically triggers change detection
   */
  createStateManager<T>(
    initialValue: T,
    cdr: ChangeDetectorRef
  ): StateManager<T> {
    return new StateManager(initialValue, cdr);
  }

  /**
   * Creates a loading state manager
   */
  createLoadingManager(cdr: ChangeDetectorRef): LoadingManager {
    return new LoadingManager(cdr);
  }

  /**
   * Creates a form state manager
   */
  createFormStateManager(cdr: ChangeDetectorRef): FormStateManager {
    return new FormStateManager(cdr);
  }

  /**
   * Utility to safely execute a callback with change detection
   */
  safeExecute<T>(
    cdr: ChangeDetectorRef,
    callback: () => T,
    onError?: (error: any) => void
  ): T | undefined {
    try {
      const result = callback();
      cdr.markForCheck();
      return result;
    } catch (error) {
      if (onError) onError(error);
      cdr.markForCheck();
      return undefined;
    }
  }

  /**
   * Creates a debounced change detection trigger
   */
  createDebouncedTrigger(
    cdr: ChangeDetectorRef,
    delay: number = 100
  ): (fn?: () => void) => void {
    let timeoutId: any;
    
    return (fn?: () => void) => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (fn) fn();
        cdr.markForCheck();
      }, delay);
    };
  }
}

/**
 * State Manager for OnPush components
 */
export class StateManager<T> {
  private _state$: BehaviorSubject<T>;
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<any>(null);

  constructor(
    private initialValue: T,
    private cdr: ChangeDetectorRef
  ) {
    this._state$ = new BehaviorSubject<T>(initialValue);
  }

  get state$(): Observable<T> {
    return this._state$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get error$(): Observable<any> {
    return this._error$.asObservable();
  }

  get currentState(): T {
    return this._state$.value;
  }

  get isLoading(): boolean {
    return this._loading$.value;
  }

  get hasError(): any {
    return this._error$.value;
  }

  /**
   * Update state and trigger change detection
   */
  setState(newState: T | ((current: T) => T)): void {
    const updatedState = typeof newState === 'function' 
      ? (newState as Function)(this._state$.value)
      : newState;
    
    this._state$.next(updatedState);
    this.cdr.markForCheck();
  }

  /**
   * Patch state (for objects)
   */
  patchState(patch: Partial<T>): void {
    if (typeof this._state$.value === 'object' && this._state$.value !== null) {
      this.setState({ ...this._state$.value, ...patch });
    }
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this._loading$.next(loading);
    this.cdr.markForCheck();
  }

  /**
   * Set error state
   */
  setError(error: any): void {
    this._error$.next(error);
    this.cdr.markForCheck();
  }

  /**
   * Clear error
   */
  clearError(): void {
    this._error$.next(null);
    this.cdr.markForCheck();
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this._state$.next(this.initialValue);
    this._loading$.next(false);
    this._error$.next(null);
    this.cdr.markForCheck();
  }

  /**
   * Execute async operation with loading/error handling
   */
  async executeAsync<R>(
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
 * Loading Manager for OnPush components
 */
export class LoadingManager {
  private _loadingStates = new Map<string, boolean>();
  private _loadingState$ = new BehaviorSubject<Map<string, boolean>>(new Map());

  constructor(private cdr: ChangeDetectorRef) {}

  get loadingState$(): Observable<Map<string, boolean>> {
    return this._loadingState$.asObservable();
  }

  /**
   * Check if a specific operation is loading
   */
  isLoading(key: string): boolean {
    return this._loadingStates.get(key) || false;
  }

  /**
   * Check if any operation is loading
   */
  isAnyLoading(): boolean {
    return Array.from(this._loadingStates.values()).some(loading => loading);
  }

  /**
   * Set loading state for a specific operation
   */
  setLoading(key: string, loading: boolean): void {
    this._loadingStates.set(key, loading);
    this._loadingState$.next(new Map(this._loadingStates));
    this.cdr.markForCheck();
  }

  /**
   * Execute operation with loading state
   */
  async executeWithLoading<T>(
    key: string,
    operation: () => Promise<T>
  ): Promise<T> {
    this.setLoading(key, true);
    try {
      return await operation();
    } finally {
      this.setLoading(key, false);
    }
  }
}

/**
 * Form State Manager for OnPush components
 */
export class FormStateManager {
  private _formState$ = new BehaviorSubject<{
    valid: boolean;
    dirty: boolean;
    touched: boolean;
    pending: boolean;
    errors: any;
  }>({
    valid: true,
    dirty: false,
    touched: false,
    pending: false,
    errors: null
  });

  constructor(private cdr: ChangeDetectorRef) {}

  get formState$(): Observable<any> {
    return this._formState$.asObservable();
  }

  get currentFormState(): any {
    return this._formState$.value;
  }

  /**
   * Update form state
   */
  updateFormState(formState: any): void {
    this._formState$.next(formState);
    this.cdr.markForCheck();
  }

  /**
   * Set form errors
   */
  setFormErrors(errors: any): void {
    this._formState$.next({
      ...this._formState$.value,
      errors
    });
    this.cdr.markForCheck();
  }

  /**
   * Clear form errors
   */
  clearFormErrors(): void {
    this.setFormErrors(null);
  }
}

/**
 * OnPush mixin for components
 */
export interface OnPushComponent {
  cdr: ChangeDetectorRef;
}

/**
 * Utility functions for OnPush components
 */
export class OnPushUtils {
  /**
   * Create a property setter that triggers change detection
   */
  static createSetter<T>(
    component: OnPushComponent,
    propertyName: string,
    initialValue?: T
  ): {
    get: () => T;
    set: (value: T) => void;
    value$: Observable<T>;
  } {
    const subject = new BehaviorSubject<T>(initialValue as T);
    
    Object.defineProperty(component, `_${propertyName}`, {
      value: subject,
      writable: false
    });

    return {
      get: () => subject.value,
      set: (value: T) => {
        subject.next(value);
        component.cdr.markForCheck();
      },
      value$: subject.asObservable()
    };
  }

  /**
   * Create an array setter that triggers change detection
   */
  static createArraySetter<T>(
    component: OnPushComponent,
    propertyName: string,
    initialValue: T[] = []
  ): {
    get: () => T[];
    set: (value: T[]) => void;
    push: (...items: T[]) => void;
    remove: (index: number) => void;
    update: (index: number, item: T) => void;
    clear: () => void;
    value$: Observable<T[]>;
  } {
    const subject = new BehaviorSubject<T[]>([...initialValue]);
    
    return {
      get: () => subject.value,
      set: (value: T[]) => {
        subject.next([...value]);
        component.cdr.markForCheck();
      },
      push: (...items: T[]) => {
        const current = subject.value;
        subject.next([...current, ...items]);
        component.cdr.markForCheck();
      },
      remove: (index: number) => {
        const current = subject.value;
        current.splice(index, 1);
        subject.next([...current]);
        component.cdr.markForCheck();
      },
      update: (index: number, item: T) => {
        const current = subject.value;
        current[index] = item;
        subject.next([...current]);
        component.cdr.markForCheck();
      },
      clear: () => {
        subject.next([]);
        component.cdr.markForCheck();
      },
      value$: subject.asObservable()
    };
  }
}
