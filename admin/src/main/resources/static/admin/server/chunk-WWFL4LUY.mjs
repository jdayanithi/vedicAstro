import './polyfills.server.mjs';
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  HttpClient,
  Observable,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/users.service.ts
var UserService = class _UserService {
  http;
  apiUrl = `${environment.apiUrl}/login`;
  constructor(http) {
    this.http = http;
  }
  getAllUsers() {
    return this.http.get(this.apiUrl);
  }
  getUserById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createUser(user) {
    return this.http.post(this.apiUrl, user);
  }
  updateUser(id, user) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  searchUsers(query) {
    if (!query || query.trim() === "") {
      return new Observable((subscriber) => {
        subscriber.next([]);
        subscriber.complete();
      });
    }
    console.log("Searching users with query:", query);
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};

export {
  UserService
};
//# sourceMappingURL=chunk-WWFL4LUY.mjs.map
