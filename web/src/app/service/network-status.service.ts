import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private isOnline$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    // Listen for online/offline events
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe(isOnline => {
      this.isOnline$.next(isOnline);
    });
  }

  get isOnline(): Observable<boolean> {
    return this.isOnline$.asObservable();
  }

  get isOnlineValue(): boolean {
    return this.isOnline$.value;
  }

  getConnectionErrorMessage(): string {
    if (!this.isOnlineValue) {
      return 'You appear to be offline. Please check your internet connection and try again.';
    }
    return 'Unable to connect to the server. Please ensure the server is running and try again.';
  }
}
