import './polyfills.server.mjs';
import {
  Router
} from "./chunk-7VTN37JO.mjs";
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  BehaviorSubject,
  HttpClient,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  isAuthenticated = new BehaviorSubject(false);
  currentUserRole = new BehaviorSubject(null);
  currentUser = new BehaviorSubject(null);
  platformId = inject(PLATFORM_ID);
  tokenExpirationTimer;
  isLoggedIn$ = this.isAuthenticated.asObservable();
  userRole$ = this.currentUserRole.asObservable();
  currentUser$ = this.currentUser.asObservable();
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.checkSession();
  }
  checkSession() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("token");
      const session = this.getSession();
      if (token && session) {
        this.isAuthenticated.next(true);
        this.currentUserRole.next(session.role);
        this.currentUser.next(session);
        try {
          const tokenData = JSON.parse(atob(token.split(".")[1]));
          const expirationTime = tokenData.exp * 1e3;
          const now = Date.now();
          if (expirationTime > now) {
            this.autoLogoutTimer(expirationTime - now);
          } else {
            this.logout();
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }
  autoLogoutTimer(duration) {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  getSession() {
    if (isPlatformBrowser(this.platformId)) {
      const sessionData = localStorage.getItem("session");
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }
  getCurrentUser() {
    return this.getSession();
  }
  login(email, password) {
    return this.http.post(`${environment.apiUrl}/login/validate`, { username: email, password }).pipe(tap((response) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("session", JSON.stringify(response));
        try {
          const tokenData = JSON.parse(atob(response.token.split(".")[1]));
          const expirationTime = tokenData.exp * 1e3;
          this.autoLogoutTimer(expirationTime - Date.now());
        } catch (e) {
          console.error("Error setting auto logout timer:", e);
        }
      }
      this.isAuthenticated.next(true);
      this.currentUserRole.next(response.role);
      this.currentUser.next(response);
    }));
  }
  register(data) {
    return this.http.post(`${environment.apiUrl}/register`, data);
  }
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    }
    this.isAuthenticated.next(false);
    this.currentUserRole.next(null);
    this.currentUser.next(null);
    this.router.navigate(["/auth/login"]);
  }
  getToken() {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem("token") : null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};

export {
  AuthService
};
//# sourceMappingURL=chunk-YEMU37C6.mjs.map
